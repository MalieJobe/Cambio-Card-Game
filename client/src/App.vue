<script setup lang="ts">
import { provide, reactive, ref } from 'vue';
import CambioGame from './CambioGame.vue';
import Lobby from './Lobby.vue';

const clientUUID = ref(null);
const userName = ref(null);
const gameId = ref(null);
const setGameId = (id) => gameId.value = id;
const setUserName = (name) => userName.value = name;
const gameState = reactive({
    discardedDeck: null,
    players: [],
});

const showGame = ref(false);

const socket = ref(null);

socket.value = new WebSocket("ws://localhost:3210");
socket.value.onmessage = message => {
    const data = JSON.parse(message.data);
    parseIncomingMessage(data);
    console.log("Received message", data);
};

function safeSend(data) {
    try {
        socket.value.send(JSON.stringify(data));
    } catch (error) {
        console.error(error);
    }
}

function parseIncomingMessage(data) {
    if (!data["method"]) throw new Error("Payload must contain a method key");

    switch (data["method"]) {
        case "connection":
            clientUUID.value = data["clientId"];
            break;
        case "joinGame": // there is not createGame coming from server, as creating client will always join
            gameId.value = data["gameId"];
            gameState.players = data["players"];
            showGame.value = true;
            break;
        default:
            console.log("Unknown method", data["method"]);
            throw new Error("Unknown method");
    }
}

function joinGame() {
    console.log("Joining game");

    safeSend({
        'method': 'joinGame',
        'clientId': clientUUID.value,
        'userName': userName.value,
        'gameId': gameId.value,
    });
}

provide('socket', { socket, safeSend });
provide('userData', { uuid: clientUUID, userName, setUserName });
provide('gameData', { gameId, joinGame, setGameId });
provide('gameState', { gameState });

</script>

<template>
    <div class="flex bg-light min-h-screen">
        <main class="m-auto pt text-center">
            <CambioGame v-if="showGame" :player-name="userName" />
            <Lobby v-else />
        </main>
    </div>
</template>