import { RawData, WebSocket, WebSocketServer } from 'ws';
import Player from './classes/Player.js';
import Card from './classes/Card.js';
import Game from './classes/Game.js';
import Deck from './classes/Deck.js';

const wss = new WebSocketServer({ port: 3210 });

console.log("Server started on port " + wss.options.port);

type collection<T> = {
    [key: string]: T,
};

const MAX_PLAYERS = 6;
const GAMES: collection<Game> = {};
const PLAYERS: collection<Player> = {};

wss.on('connection', (ws: WebSocket) => {
    // @ts-ignore
    console.log("new connection: ", ws._socket.remoteAddress, ws._socket.remotePort)

    ws.on('error', console.error);
    ws.on('message', data => parseIncomingMessage(data));

    const clientUUID = crypto.randomUUID();
    // @ts-ignore
    PLAYERS[clientUUID] = new Player(ws);

    safeSend(ws, { 'method': 'connection', 'clientId': clientUUID });
});

function safeSend(ws: WebSocket, data: {
    method: string,
    clientId: string,
    gameId?: string,
    players?: Array<Player>
}) {
    try {
        ws.send(JSON.stringify(data));
    } catch (error) {
        console.error(error);
    }
}

function parseIncomingMessage(data: RawData): void {
    const message = JSON.parse(String(data));
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

function createGame(message: { clientId: string, userName: string }) {
    const { clientId, userName } = message;
    if (!userName) throw new Error("Payload must contain a userName key");


    const gameUID = Game.generateUID(); // todo check if existing already
    const game = new Game(gameUID, new Deck([]), new Deck([]));
    game.activeDeck.loadFullDeck();
    game.activeDeck.shuffle();

    GAMES[gameUID] = game;
    console.log("new game created: ", gameUID)

    joinGame({ clientId, "gameId": gameUID, userName });
}

function joinGame(data: { clientId: string, gameId: string, userName: string }) {
    const { clientId, gameId, userName } = data;
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
        // @ts-ignore
        safeSend(client.socketRef, {
            "method": "joinGame",
            "gameId": gameId,
            "players": allPlayersData,
        });
    }

    console.log("player joined game: ", userName, gameId)
}


function takeRandomCardFrom(deck: Deck): Card {
    const randomCardIndex = Math.floor(Math.random() * deck.cards.length)
    const randomCard = deck.cards.splice(randomCardIndex, 1)
    console.log("random c is: ", randomCard[0])
    return randomCard[0]
}