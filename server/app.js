import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 3210 });

console.log("Server started on port 3210");

const MAX_PLAYERS = 6;
// const MIN_PLAYERS = 2;
const GAMES = {};
const PLAYERS = {};

wss.on('connection', ws => {

    console.log("new connection: ", ws._socket.remoteAddress, ws._socket.remotePort)

    ws.on('error', console.error);
    ws.on('message', data => parseIncomingMessage(data));

    const clientUUID = crypto.randomUUID();
    PLAYERS[clientUUID] = { "socket": ws, "userName": null };

    safeSend(ws, { 'method': 'connection', 'clientId': clientUUID });

    // setInterval(() => {
    //     safeSend(ws, { 'method': 'test', 'payload': true });
    // }, 5000);
});

function safeSend(ws, data) {
    try {
        ws.send(JSON.stringify(data));
    } catch (error) {
        console.error(error);
    }
}

function parseIncomingMessage(data) {
    const message = JSON.parse(data);
    if (!message["method"]) throw new Error("Payload must contain a method key");
    if (!message["clientId"]) throw new Error("Payload must contain a clientId key");
    if (!message["clientId"].match(/^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/)) throw new Error("Invalid clientId format");


    switch (message["method"]) {
        case "createGame":
            createGame(message);
            break;
        case "joinGame":
            joinGame(message);
            break;
        default:
            throw new Error("Unknown method");
    }
}

function createGame(data) {
    if (!data["clientId"]) throw new Error("Payload must contain a clientId key");
    const { clientId } = data;
    const gameUUID = crypto.randomUUID();

    GAMES[gameUUID] = { "players": [] };
    console.log("new game created: ", gameUUID)

    console.log(PLAYERS)

    safeSend(PLAYERS[clientId]["socket"], {
        "method": "createGame",
        "gameId": gameUUID,
    });
}

function joinGame(data) {
    const { clientId, gameId, userName } = data;

    if (!gameId) throw new Error("Payload must contain a gameId key");

    console.log(GAMES[gameId], GAMES[gameId].players.length, MAX_PLAYERS)
    if (GAMES[gameId] && GAMES[gameId].players.length < MAX_PLAYERS) {
        PLAYERS[clientId]["userName"] = userName;
        GAMES[gameId].players.push(clientId);

        for (const player of GAMES[gameId].players) {
            safeSend(PLAYERS[player]["socket"], {
                "method": "joinGame",
                "gameId": gameId,
                "players": GAMES[gameId].players,
            });
        }

        console.log("player joined game: ", userName, gameId)
    } else {
        console.log("game is full: ", gameId)
    }
}


// initializePlayer(socket.id);
//     socket.emit("initialState", {
//         activeDeck: activeDeck[0],
//         discardedDeck: discardedDeck[discardedDeck.length - 1],
//         myDeck: playerDecks[socket.id]
//     });

// import Deck from "./classes/Deck.js";
// import Player from "./classes/Player.js";
// import Card from "./classes/Card.js";

// const activeDeck = new Deck([]);
// activeDeck.loadFullDeck();
// activeDeck.shuffle();

// const discardedDeck = new Deck([]);


// const playerDecks = {}
// let playerCount = 0;
// const MAX_PLAYERS = 6;

// function initializePlayer(playerName) {
//     playerDecks[playerName] = [...Array(4)].map(() => takeRandomCardFrom(activeDeck))
//     console.log("the deck is: ", playerDecks[playerName])
// }

// function takeRandomCardFrom(deck) {
//     const randomCardIndex = Math.floor(Math.random() * deck.length)
//     const randomCard = deck.splice(randomCardIndex, 1)
//     console.log("random c is: ", randomCard[0])
//     return randomCard[0]
// }

// if (playerCount >= MAX_PLAYERS) {
//     socket.emit('error', { message: 'The game is full. Please try again later.' });
//     socket.disconnect();
//     return;
// }