<template>
    <div class="card">{{ isCard ? card.shortName : "Hidden" }}
        <svg>
            <use :href="'#' + card.shortName" /><!-- # Hashtag for id selector-->
        </svg>
    </div>
</template>
<script setup>
const { card } = defineProps(["card"]);
const isCard = typeof card !== "string"; // todo check for Type Card with Typescript
</script>
<style scoped>
.card {
    border: 1px solid black;
    padding: 10px;
    margin: 10px;
    display: inline-block;
}
</style>