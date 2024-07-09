<script setup lang="ts">
import { ref } from 'vue';
import CambioGame from './CambioGame.vue';

const userName = ref(null);
const showGame = ref(false);

</script>

<template>
    <CambioGame v-if="showGame" />
    <div v-else>
        <input type="text" v-model="userName" placeholder="Enter your name">
        <button @click="() => { if (userName) showGame = true }">Enter Game</button>
    </div>
</template>