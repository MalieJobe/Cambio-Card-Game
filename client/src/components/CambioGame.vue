<script setup>
import { io } from "socket.io-client"
import { onMounted, ref } from "vue";

const socket = ref(null);
socket.value = io('http://localhost:3210');

const activeDeck = ref(null)
const discardedDeck = ref(null)
const myDeck = ref()


onMounted(() => {
  socket.value.on("initialState", data => {
    activeDeck.value = data.activeDeck;
    discardedDeck.value = data.discardedDeck;
    myDeck.value = data.myDeck;

    console.log(data.activeDeck, data.myDeck);
  })

  socket.value.on("error", data => {
    console.error(data.message)
  })
});

function drawCard(direction) {
  socket.value.emit("move", direction)
}


</script>

<template>
  <div class="my_hand">
    <p v-for="card in myDeck">{{ card }}</p>
  </div>
</template>

<style scoped></style>
