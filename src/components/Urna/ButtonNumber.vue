<script setup lang="ts">

type Digit = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 
const emit = defineEmits(['clickDigit']);
const props = defineProps<{
    digit: Digit
}>()

</script>

<template>
    <button class="btnUrna" @click="emit('clickDigit', props.digit)">
        {{ digit }}
    </button>
</template>

<style>

.btnUrna {
    display: flex;
    justify-content: start;
    align-items: start;
    background-color: var(--color-preto);
    color: var(--color-branco);
    width: 100%;
    height: 100%;
}

</style>