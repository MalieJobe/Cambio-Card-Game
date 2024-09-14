<template>
    <div class="card">
        <svg class=" aspect-[3/4]">
            <use :href="'#' + (isCard && card.shortName ? card.shortName : 'COVER')" /><!-- # Hashtag for id selector-->
        </svg>
    </div>
</template>
<script setup>
const { card } = defineProps(["card"]);
console.log("current card is: ", card, " of type ", typeof card);
const isCard = card !== "redacted"; // todo check for Type Card with Typescript
</script>
<style scoped>
</style>