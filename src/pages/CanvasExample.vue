<script setup>
import { ref } from 'vue';
import CanvasComponent from '../components/CanvasComponent.vue';
import Circle from '../components/Circle.vue';
function getRandomInRange(from, to, fixed) {
    return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
    // .toFixed() returns string, so ' * 1' is a trick to convert to number
}
let circles = ref([
    {
        x: getRandomInRange(0,800, 0),
        y: getRandomInRange(0,600, 0),
        radius: getRandomInRange(0,100, 0)
    },
    {
        x: getRandomInRange(0,800, 0),
        y: getRandomInRange(0,600, 0),
        radius: getRandomInRange(0,100, 0)
    },
    {
        x: getRandomInRange(0,800, 0),
        y: getRandomInRange(0,600, 0),
        radius: getRandomInRange(0,100, 0)
    }
]);
function addCircle(){
    circles.value.push({
        x: getRandomInRange(0,800, 0),
        y: getRandomInRange(0,600, 0),
        radius: getRandomInRange(0,100, 0)
    });
}
</script>
<template>
    <button class="button is-primary" @click="addCircle">Add Circle</button>
<CanvasComponent>
    <Circle v-for="circle in circles" :x="circle.x" :y="circle.y" :radius="circle.radius"></Circle>
</CanvasComponent>
</template>