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

<style>

.confirmButton {
    color: #000000;
    font-size: 1.2rem;
    text-transform: uppercase;
    padding: 18px 32px;
    width: 100%;
    height: 100%;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

</style>