<script setup>
import { io } from "socket.io-client"
import { onMounted, ref } from "vue";


const socket = ref(null);
const context = ref({});
const position = ref({
  x: 0,
  y: 0,
})

const game = ref(null);

socket.value = io('http://localhost:3210');



onMounted(() => {
  context.value = game.value.getContext('2d');
  socket.value.on("position", data => {
    position.value = data;
    context.value.clearRect(0, 0, game.value.width, game.value.height);
    context.value.fillRect(position.value.x, position.value.y, 20, 20);
  })
});

function move(direction) {
  socket.value.emit("move", direction)
}


</script>

<template>
  <canvas ref="game" width="400" height="400" style="border:1px solid black"></canvas>
  <p>
    <button @click="move('left')">left</button>
    <button @click="move('right')">right</button>
    <button @click="move('up')">up</button>
    <button @click="move('down')">down</button>
  </p>
</template>

<style scoped></style>
