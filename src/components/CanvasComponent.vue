<script setup>
import { onMounted, ref } from 'vue';
let myCanvas = ref();
let props = defineProps(['x']);


</script>
<template>
<canvas ref="myCanvas" width="800" height="600">
    <slot></slot>
</canvas>
</template>