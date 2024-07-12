import { WebSocketServer } from 'ws';
import Game from './classes/Game.js';
import Deck from './classes/Deck.js';
import Player from './classes/Player.js';

const wss = new WebSocketServer({ port: 3210 });

console.log("Server started on port " + wss.options.port);

const MAX_PLAYERS = 6;
const GAMES = {};
const PLAYERS = {};

wss.on('connection', ws => {

    console.log("new connection: ", ws._socket.remoteAddress, ws._socket.remotePort)

    ws.on('error', console.error);
    ws.on('message', data => parseIncomingMessage(data));

    const clientUUID = crypto.randomUUID();
    PLAYERS[clientUUID] = new Player(ws);

    safeSend(ws, { 'method': 'connection', 'clientId': clientUUID });
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

function createGame(message) {
    const { clientId, userName } = message;
    if (!userName) throw new Error("Payload must contain a userName key");


    const gameUUID = crypto.randomUUID();
    const game = new Game(new Deck([]), new Deck([]));
    game.activeDeck.loadFullDeck();
    game.activeDeck.shuffle();

    GAMES[gameUUID] = game;
    console.log("new game created: ", gameUUID)

    joinGame({ clientId, "gameId": gameUUID, userName });
}

function joinGame(data) {
    const { clientId, gameId, userName } = data;
    if (!gameId) throw new Error("Payload must contain a gameId key");
    if (!GAMES[gameId]) throw new Error("Could not find game"); // todo answer to client
    if (GAMES[gameId].players.length >= MAX_PLAYERS) throw new Error("Game is full"); // todo answer to client

    const player = PLAYERS[clientId];
    player["userName"] = userName;
    player["gameRef"] = gameId;
    player["hand"] = Array(4).fill(null).map(() => takeRandomCardFrom(GAMES[gameId].activeDeck));
    GAMES[gameId].players.push(player);

    for (const client of GAMES[gameId].players) {
        const hiddenPlayersData = GAMES[gameId].players.filter(p => p !== client).map(p => p.anonymizedData());
        const allPlayersData = [...hiddenPlayersData, client];
        safeSend(client.socketRef, {
            "method": "joinGame",
            "gameId": gameId,
            "players": allPlayersData,
        });
    }

    console.log("player joined game: ", userName, gameId)
}


function takeRandomCardFrom(deck) {
    const randomCardIndex = Math.floor(Math.random() * deck.cards.length)
    const randomCard = deck.cards.splice(randomCardIndex, 1)
    console.log("random c is: ", randomCard[0])
    return randomCard[0]
}