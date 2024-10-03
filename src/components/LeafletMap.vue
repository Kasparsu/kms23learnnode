<script setup>
import L from "leaflet";
import 'leaflet/dist/leaflet.css';
import { onMounted, useId, watch, toRefs } from 'vue';
let props = defineProps(['lat', 'lng', 'zoom']);
let emit = defineEmits(['zoom', 'move']);
const id = useId();
let zoom = toRefs(props).zoom;
let lat = toRefs(props).lat;
let lng = toRefs(props).lng;
let map = null;
onMounted(() => {
    map = L.map('map'+id).setView([props.lat, props.lng], props.zoom);
    //var map = L.map('map'+id).setView([59.4269, 24.7434], 19);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
    map.on('zoomend', function(ev) {
        console.log(map.getZoom());
        emit('zoom', map.getZoom());
    });
    map.on('moveend', ev => {
        emit('move', map.getCenter());
    });
});

watch(zoom, (newZoom, oldZoom) => {
    map.setZoom(newZoom);
});

watch(lat, newLat => {
    map.panTo([newLat, lng.value]);
});
watch(lng, newLng => {
    map.panTo([lat.value, newLng]);
});

</script>

<template>
    <div :id="'map'+id"></div>
</template>

<style scoped>
div {
    height: 80vh; 
}
</style>