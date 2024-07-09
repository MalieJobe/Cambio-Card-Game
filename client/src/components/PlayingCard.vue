<template>
    <div class="card">{{ suit }} - {{ value }}</div>
</template>
<script setup>
import { onMounted } from 'vue';

const suit = defineProps(["suit"]);

onMounted(() => {
    console.log(suit);
})
</script>
<style scoped>
.card {
    border: 1px solid black;
    padding: 10px;
    margin: 10px;
    display: inline-block;
}
</style>