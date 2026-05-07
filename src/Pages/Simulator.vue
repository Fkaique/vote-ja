<script setup lang="ts">
import { ref } from 'vue';
import Urna from '../components/Urna/Urna.vue';

const numeroDigitado = ref('');

function handleDigit(n: number) {
    if (numeroDigitado.value.length < 5) {
        numeroDigitado.value += n.toString();
    }
}

</script>

<template>
    <div class="containerUrna">
        <div class="painel">
            <div class="display-numero">
                {{ numeroDigitado }}
            </div>
        </div>
        <div class="urna">
            <Urna @digit-pressed="handleDigit" />
        </div>
    </div>
</template>

<style>

.containerUrna {
    display: flex;
}

.urna {
    display: flex;
    width: 500px;
    height: 500px;
    background-color: var(--color-text);
    padding: 40px 60px;
    font-size: 3rem;
}

.painel {
    width: 300px;
    height: 100px;
    background-color: #f0f0f0;
    border: 2px solid #000;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2rem;
}
</style>