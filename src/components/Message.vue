<script setup>
defineProps(['isMe'])
</script>
<template>
    <div class="columns">
        <div class="column">
            <article v-if="!isMe" class="message">
                <div class="message-body">
                    <slot></slot>
                </div>
            </article>
        </div>
        <div class="column">
            <article v-if="isMe" class="message is-primary">
                <div class="message-body">
                    <slot></slot>
                </div>
            </article>
        </div>
    </div>

</template>