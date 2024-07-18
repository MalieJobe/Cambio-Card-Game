<script setup>
import { inject, ref } from "vue";
import Player from "./components/Player.vue";

const myDeck = ref()

const { gameState } = inject("gameState");
console.log(gameState)
const playerName = defineProps(["playerName"]);




</script>

<template>
  <Player :player="player.value" v-for="player in gameState.players" />
</template>

<style scoped></style>
