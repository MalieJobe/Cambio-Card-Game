<template>
    <div class="shadow-xl rounded border bg-white">
        <h1 class="text-2xl font-bold pt-4">Cambio - Lobby</h1>
        <div class="p-4">
            <input v-model="userName" placeholder="Enter your name" class="w-full p-2 rounded border" />
        </div>
        <hr class="border-t w-5/6 mx-auto" />
        <div class="p-4 pt-0">
            <button @click="createGame" :disabled="!userName || !uuid"
                class="w-full p-2 mt-2 bg-primary text-white rounded disabled:bg-gray-400 disabled:cursor-not-allowed">Create
                Game</button>
        </div>
        <div class="p-4 pt-0 flex gap-x-2 items-center">
            <input v-model="roomCode" placeholder="Have a game code?" class="w-full min-w-40 p-2 rounded border h-10" />
            <button @click="initiateJoining" :disabled="!userName || !roomCode || !uuid"
                class="w-full p-2 bg-primary text-white rounded h-10 disabled:bg-gray-400 disabled:cursor-not-allowed">Join
                Game</button>
        </div>
    </div>
</template>

<script setup>
import { inject, ref, watch } from 'vue';

const { safeSend } = inject('socket');
const { uuid, userName, setUserName } = inject('userData');
const { joinGame, setGameId } = inject('gameData');

const roomCode = ref(null);

watch(roomCode, (code) => {
    if (code) {
        setGameId(code);
    }
});

function createGame() {
    console.log("Creating game");
    setUserName(userName.value);

    safeSend({
        'method': 'createGame',
        'clientId': uuid.value,
        'userName': userName.value,
    });
}

function initiateJoining() {
    setUserName(userName.value)
    joinGame();
}


</script>