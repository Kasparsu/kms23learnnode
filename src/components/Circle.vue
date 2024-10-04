<script setup>
import { getCurrentInstance, onMounted } from 'vue';
const instance = getCurrentInstance();
let props = defineProps(['x', 'y', 'radius']);
let ctx;
onMounted(() => {
    var c = instance.parent.refs.myCanvas;
    ctx = c.getContext("2d");
    ctx.beginPath();
    ctx.arc(props.x, props.y, props.radius, 0, 2 * Math.PI);
    ctx.stroke();
});
</script>
<template>

</template>