<script setup>
import { ref } from 'vue';
import LeafletMap from '../components/LeafletMap.vue';

let lat = ref(0);
let lng = ref(0); 

let markers = ref([

]);

function vibrate(){
    navigator.vibrate(200);
}

const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};

function success(pos) {
  const crd = pos.coords;
    lat.value = crd.latitude;
    lng.value = crd.longitude;
    markers.value.push({lat: crd.latitude, lng: crd.longitude});
  console.log("Your current position is:");
  console.log(`Latitude : ${crd.latitude}`);
  console.log(`Longitude: ${crd.longitude}`);
  console.log(`More or less ${crd.accuracy} meters.`);
}

function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}

navigator.geolocation.getCurrentPosition(success, error, options);
</script>
<template>
    <button class="button is-primary" @click="vibrate">Vibrate</button>
    <LeafletMap :lat="lat" :lng="lng" zoom="19" :markers="markers"></LeafletMap>
</template>