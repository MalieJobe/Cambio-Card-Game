<script setup>
import { inject, ref } from "vue";
import Player from "./components/Player.vue";
import Sprite from "./assets/Sprite.vue"

const myDeck = ref()

const { gameState } = inject("gameState");
const playerName = defineProps(["playerName"]);

console.log("state: ", gameState.players)
</script>

<template>
  <Sprite /> <!-- load the svg -->
  <Player :player="p" v-for="p in gameState.players" />
</template>

<style scoped></style>
