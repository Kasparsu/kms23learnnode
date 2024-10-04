<script setup>
import { onMounted, useId, watch, toRefs } from 'vue';
const id = useId();
import { Loader } from "@googlemaps/js-api-loader";

const loader = new Loader({
    apiKey: process.env.GOOGLE_API_KEY,
    version: "weekly",
});
onMounted(() => {
    loader.load().then(async () => {
        const { Map } = await google.maps.importLibrary("maps");

        let map = new Map(document.getElementById("map" + id), {
            center: { lat: -34.397, lng: 150.644 },
            zoom: 8,
        });
    });
});

</script>

<template>
    <div :id="'map' + id"></div>
</template>

<style scoped>
div {
    height: 80vh;
}
</style>