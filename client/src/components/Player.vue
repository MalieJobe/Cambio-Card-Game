<script setup>
import { computed, onMounted, watch } from 'vue';
import Hand from './Hand.vue';

const { player, location } = defineProps(["player", "location"]);

// Computed property to check if player and player.hand are defined
const isPlayerDefined = computed(() => player && player.hand);

// Watch for changes to player and player.hand
watch(player, (newPlayer) => {
    console.log("player updated: ", newPlayer);
    if (newPlayer && newPlayer.hand) {
        console.log("player hand updated: ", newPlayer.hand);
    }
});

// Watch for changes to player.hand specifically
watch(() => player.hand, (newHand) => {
    console.log("player hand updated: ", newHand);
});

onMounted(() => { console.log("username is: ", player.userName) })
onMounted(() => { console.log("and player info is: ", player) })

</script>

<template>
    <div :style="{'grid-area': location }">
        <h3 v-if="player">{{ player.userName }}</h3>
        <!-- Conditional rendering to ensure Hand is only rendered when player.hand is available -->
        <Hand v-if="isPlayerDefined" :cards="player.hand" />
    </div>
</template>