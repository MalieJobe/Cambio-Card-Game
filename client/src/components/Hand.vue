<template>
    <div class="grid grid-cols-2 gap-1">
        <PlayingCard v-for="(card, index) in cards" :key="index" :card />
    </div>
</template>

<script setup>
import PlayingCard from "./PlayingCard.vue";
const { cards } = defineProps(["cards"]);
</script>

<style></style>