<template>
    <div class="masonry-container">
        <PlayingCard v-for="(card, index) in cards" :key="index" :suit="card" class="masonry-item" />
    </div>
</template>

<script setup>
import { onMounted } from "vue";
import PlayingCard from "./PlayingCard.vue";
const cards = defineProps(["cards"]);

onMounted(() => {
    console.log(cards);
}); 
</script>

<style>
.masonry-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    /* Adjust minmax value as needed */
    gap: 16px;
    /* Adjust gap as needed */
}

.masonry-item {
    display: flex;
    flex-direction: column;
}

.masonry-item:nth-child(odd) {
    order: 1;
}

.masonry-item:nth-child(even) {
    order: 2;
}

.masonry-container::before {
    content: '';
    width: 100%;
    grid-column: span 2;
    /* Adjust to match the number of columns */
}
</style>