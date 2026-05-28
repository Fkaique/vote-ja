<script setup lang="ts">
defineProps < {
    color?: string
    action: () => number
} > ()
</script>

<template>
    <button class="confirmButton" v-on:click="action" :style="{ backgroundColor: color }">
        <slot></slot>
    </button>
</template>

<style scoped>
.confirmButton {
    color: #000000;
    font-family: 'Arial', sans-serif;
    font-size: 0.8rem;
    font-weight: bold;
    text-transform: uppercase;
    width: 100%;
    border: none;
    border-radius: 3px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: -1px -1px 2px rgba(255,255,255,0.3), 
                2px 3px 5px rgba(0,0,0,0.4),
                inset 1px 1px 3px rgba(255,255,255,0.2);
    transition: all 0.05s ease;
}

.confirmButton:active {
    box-shadow: inset 2px 2px 4px rgba(0,0,0,0.5);
    transform: translate(1px, 1px);
}
</style>