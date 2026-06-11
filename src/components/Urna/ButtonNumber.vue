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

<style scoped>
.btnUrna {
    display: flex;
    justify-content: center; /* Mudado para centralizar */
    align-items: center;     /* Mudado para centralizar */
    background-color: #111111;
    color: #ffffff;
    font-family: Arial, sans-serif;
    font-size: 1.6rem;
    font-weight: bold;
    width: 65px;
    height: 50px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    /* Efeito de botão mecânico realçado */
    box-shadow: -1px -1px 2px rgba(255,255,255,0.2), 
                3px 3px 5px rgba(0,0,0,0.6),
                inset 1px 1px 2px rgba(255,255,255,0.1);
}

.btnUrna:active {
    box-shadow: inset 2px 2px 4px rgba(0,0,0,0.8);
    transform: translate(1px, 1px);
}
</style>