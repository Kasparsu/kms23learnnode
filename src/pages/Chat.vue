<script setup>
import { ref, onUnmounted } from 'vue';
import Message from '../components/Message.vue';
let message = ref('');
let messages = ref([]);

let hasName = ref(false);
let name = ref('');
let names = ref([]);
function send() {
    if (message.value.trim() !== '') {
        let msg = {
            type: 'message',
            value: {
                message: message.value.trim(),
                name: name.value,
                isMe: true,
            }
        }
        messages.value.push(msg);
        wsSend('message', msg.value);
    }
    message.value = '';
}

function join() {
    hasName.value = true;
    wsSend('joined', name.value);
}

function wsSend(type, value) {
    socket.send(JSON.stringify({ type: type, value: value }));
}

// Create WebSocket connection.
const socket = new WebSocket("ws://localhost:8080");

// Connection opened
socket.addEventListener("open", (event) => {

});

// Connection opened
socket.addEventListener("close", (event) => {

});

// Listen for messages
socket.addEventListener("message", (event) => {
    let msg = JSON.parse(event.data);
    if (msg.type === 'message') {
        msg.value.isMe = false;
    }
    if(msg.type === 'joined'){
        names.value.push(msg.value);
    }
    if(msg.type === 'leaved'){
        names.value = names.value.filter(n => msg.value.id !== n.id);
    }
    if(msg.type === 'users'){
        names.value = msg.value;
    }
    messages.value.push(msg);
});

</script>
<template>
    <div class="columns" v-if="hasName">
        <div class="column is-one-fifth">
            <aside class="menu">
                <p class="menu-label">Users</p>
                <ul class="menu-list">
                    <li v-for="n in names"><a>{{ n.name }}</a></li>
                </ul>
            </aside>
        </div>
        <div class="column">
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
            <div class="mt-2" v-for="msg in messages">
                <Message :isMe="msg.value.isMe" v-if="msg.type == 'message'">
                    <p>{{ msg.value.message }}</p>
                    <p><b>{{ msg.value.name }}</b></p>
                </Message>
                <div v-else-if="msg.type == 'joined'" class="has-text-centered">
                    <b>{{ msg.value.name }} has Joined</b>
                </div>
                <div v-else-if="msg.type == 'leaved'" class="has-text-centered">
                    <b>{{ msg.value.name }} has Left</b>
                </div>
            </div>
        </div>
    </div>
    <div v-else>
        <div class="field has-addons">
            <div class="control is-expanded">
                <input v-model="name" @keydown.enter="join" class="input" type="text" placeholder="Enter name">
            </div>
            <div class="control">
                <button class="button is-info" @click="join">
                    Join
                </button>
            </div>
        </div>
    </div>
</template>