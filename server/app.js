import cors from 'cors';
import express from 'express';
import { createServer } from 'http';
import { Server as SocketIO } from 'socket.io';

const app = express().use(cors());
const httpServer = createServer(app);
const Socketio = new SocketIO(httpServer, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"]
    }
});

httpServer.listen(3210, () => {
    console.log("listening at 3210...");
})

const MAX_PLAYERS = 6;
// const MIN_PLAYERS = 2;

const GAMES = {};
const PLAYERS = {};


Socketio.on("connection", socket => {

    socket.on("disconnect", (reason) => {
        console.log("disconnected: ", socket.id, reason)
    });

    const clientUUID = crypto.randomUUID();
    PLAYERS[clientUUID] = { "connection": socket, "userName": null };

    socket.emit("connection", { "ClientId": clientUUID });
    console.log("new connection: ", socket.id)
})

Socketio.on("createGame", data => {
    const { clientId } = data;
    const gameUUID = crypto.randomUUID();

    GAMES[gameUUID] = { "players": [] };
    console.log("new game created: ", gameUUID)

    PLAYERS[clientId]["connection"].emit("createGame", { "gameId": gameUUID });
})

Socketio.on("joinGame", data => {
    const { clientId, gameId, userName } = data;

    if (GAMES[gameId] && GAMES[gameId].players.length < MAX_PLAYERS) {
        PLAYERS[clientId]["userName"] = userName;
        GAMES[gameId].players.push(clientId);
        console.log("player joined game: ", userName, gameId)
    } else {
        console.log("game is full: ", gameId)
    }
})


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