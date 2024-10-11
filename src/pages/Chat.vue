<script setup>
import { ref } from 'vue';
import Message from '../components/Message.vue';
let message = ref('');
let messages = ref([]);

function send(){
    if(message.value.trim() !== ''){
        messages.value.push(message.value.trim());
    }
    message.value = '';
}

// Create WebSocket connection.
const socket = new WebSocket("ws://localhost:8080");

// Connection opened
socket.addEventListener("open", (event) => {
  socket.send("Hello Server!");
});

// Listen for messages
socket.addEventListener("message", (event) => {
  console.log("Message from server ", event.data);
});


</script>
<template>
    <div class="field has-addons">
        <div class="control is-expanded">
            <input v-model="message" @keydown.enter="send" class="input" type="text" placeholder="Message">
        </div>
        <div class="control">
            <button class="button is-info" @click="send">
                Send
            </button>
        </div>
    </div>
    <Message v-for="msg in messages">{{ msg }}</Message>
</template>