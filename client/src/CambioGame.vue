<script setup>
import { onMounted, ref } from "vue";
import Hand from "./components/Hand.vue";

const activeDeck = ref(null)
const discardedDeck = ref(null)
const myDeck = ref()

const playerName = defineProps(["playerName"]);




</script>

<template>
  <Hand :cards="myDeck" />
</template>

<style scoped></style>
