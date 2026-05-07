<script setup lang="ts">
import ButtonNumber from './ButtonNumber.vue';

</script>

<template>
    <div class="teclado">
        <div class="btn1">
            <ButtonNumber class="btnUrna" :digit="1" @click-digit="$emit('digit-pressed', $event)"/>
        </div>
        <div class="btn2">
            <ButtonNumber class="btnUrna" :digit="2" @click-digit="$emit('digit-pressed', $event)"/>
        </div>
        <div class="btn3">
            <ButtonNumber class="btnUrna" :digit="3" @click-digit="$emit('digit-pressed', $event)"/>
        </div>
        <div class="btn4">
            <ButtonNumber class="btnUrna" :digit="4" @click-digit="$emit('digit-pressed', $event)"/>
        </div>
        <div class="btn5">
            <ButtonNumber class="btnUrna" :digit="5" @click-digit="$emit('digit-pressed', $event)"/>
        </div>
        <div class="btn6">
            <ButtonNumber class="btnUrna" :digit="6" @click-digit="$emit('digit-pressed', $event)"/>
        </div>
        <div class="btn7">
            <ButtonNumber class="btnUrna" :digit="7" @click-digit="$emit('digit-pressed', $event)"/>
        </div>
        <div class="btn8">
            <ButtonNumber class="btnUrna" :digit="8" @click-digit="$emit('digit-pressed', $event)"/>
        </div>
        <div class="btn9">
            <ButtonNumber class="btnUrna" :digit="9" @click-digit="$emit('digit-pressed', $event)"/>
        </div>
        <div class="btn0">
            <ButtonNumber class="btnUrna" :digit="0" @click-digit="$emit('digit-pressed', $event)"/>
        </div>
    </div>
</template>

<style>

.teclado {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    justify-self: center;
    width: 100%;
    height: 100%;
    gap: 10px;
}

.btnUrna {
    padding: 5px;
}

.btn0 {
    grid-column: 2;
    display: flex;
    justify-content: center;
}

</style>