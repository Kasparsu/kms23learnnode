<script setup>
import LeafletMap from '../components/LeafletMap.vue';
import {ref} from 'vue';
let map1Zoom = ref(19);
let map1Lat = ref(59.4269);
let map1Lng = ref(24.7434);


</script>

<template>
    <input type="range" min="1" max="19" step="1" v-model="map1Zoom"> {{ map1Zoom }}
    <button class="button is-primary" @click="map1Lat=40.70735; map1Lng=-74.00753">Go to New York</button>
    <LeafletMap 
        :lat="map1Lat" 
        :lng="map1Lng" 
        :zoom="map1Zoom" 
        @zoom="map1Zoom=$event"
        @move="map1Lat=$event.lat; map1Lng=$event.lng"></LeafletMap>
    <LeafletMap lat="32.4269" lng="12.7434" zoom="7"></LeafletMap>
    <LeafletMap lat="0" lng="0" zoom="12"></LeafletMap>
</template>
