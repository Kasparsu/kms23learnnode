<script setup>
import GoogleMap from '../components/GoogleMap.vue';
import LeafletMap from '../components/LeafletMap.vue';
import {ref} from 'vue';
let map1Zoom = ref(19);
let map1Lat = ref(59.4269);
let map1Lng = ref(24.7434);
let map1Markers = ref([
    {lat: 32.4269, lng: 12.7434},
    {lat: 40.70735, lng: -74.00753}
]);
function getRandomInRange(from, to, fixed) {
    return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
    // .toFixed() returns string, so ' * 1' is a trick to convert to number
}
</script>

<template>
    <input type="range" min="1" max="19" step="1" v-model="map1Zoom"> {{ map1Zoom }}
    <button class="button is-primary" @click="map1Lat=40.70735; map1Lng=-74.00753">Go to New York</button>
    <button class="button is-primary" @click="map1Markers.push({lat: getRandomInRange(-90, 90, 4), lng:getRandomInRange(-180, 180, 4)})">Add marker</button>
    <!-- <LeafletMap 
        :lat="map1Lat" 
        :lng="map1Lng" 
        :zoom="map1Zoom" 
        @zoom="map1Zoom=$event"
        @move="map1Lat=$event.lat; map1Lng=$event.lng" :markers="map1Markers"></LeafletMap>
    <LeafletMap lat="32.4269" lng="12.7434" zoom="7"></LeafletMap>
    <LeafletMap lat="0" lng="0" zoom="12"></LeafletMap> -->
    <GoogleMap></GoogleMap>
</template>
