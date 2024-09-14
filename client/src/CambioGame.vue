<script setup>
import { computed, inject, ref, watch } from "vue";
import Player from "./components/Player.vue";
import Sprite from "./assets/Sprite.vue"

const myDeck = ref()

const { gameState } = inject("gameState");
const { gameId } = inject("gameData");
const playerName = defineProps(["playerName"]);

watch(gameState, (newState) => {
  console.log("gameState changed: ", newState.players)
})

const playerCountClass = computed(() => {
  return {
    2: 'two-players',
    3: 'three-players',
    4: 'four-players',
    5: 'five-players',
    6: 'six-players'
  }[gameState.players.length];
});
</script>

<template>
  <h1>Room ID: {{ gameId }}</h1>
  <Sprite /> <!-- load the svg -->

    <div class="h-screen w-screen max-h-screen gap-5 m-auto overflow-hidden" :class="playerCountClass, { 'grid': gameState.players.length !== 1 }">
      <Player v-for="(p, index) in gameState.players" :player="p" :location="'player' + (index + 1)"/>
    </div>

</template>

<style scoped>
.two-players {
  grid-template-areas: 
    "player2"
    "player1";
}

.three-players {
  grid-template-areas: 
    "player2 . player3"  
    ". player1 .";
}

.four-players {
  grid-template-areas: 
    ". player4 ."
  "player2 . player3"
    ". player1 .";
}

.five-players {
  grid-template-areas: 
    "player4 . player5"
    "player2 . player3"
      ". player1 .";
}

.six-players {
  grid-template-areas: 
      ". player6 ."
    "player4 . player5"
    "player2 . player3"
      ". player1 .";
}
</style>
