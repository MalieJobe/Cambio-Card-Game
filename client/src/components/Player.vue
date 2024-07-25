<script setup>
const player = defineProps(["player"]);
import { onMounted } from 'vue';
import Hand from './Hand.vue';

onMounted(() => { console.log("username is: ", player.userName) })
</script>

<template>
    <h3>{{ player.userName }}</h3>
    <!-- <Hand :cards="player.hand" /> -->
</template>