<script setup lang="ts">
import { provide, ref } from 'vue';
import CambioGame from './CambioGame.vue';
import Lobby from './Lobby.vue';

const clientUUID = ref(null);
const userName = ref(null);
const roomCode = ref(null);
const gameId = ref(null);
const setGameId = (id) => gameId.value = id;

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
provide('userData', { uuid: clientUUID, userName });
provide('gameData', { gameId, roomCode, joinGame, setGameId });

</script>

<template>
    <div class="flex h-screen bg-light"> <!-- h-screen and m-auto center it verticall and horizontally -->
        <div class="m-auto pt text-center sm:px-12">
            <CambioGame v-if="showGame" />
            <Lobby v-else />
        </div>
    </div>
</template>