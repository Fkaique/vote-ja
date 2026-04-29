<script setup lang="ts">
import Button from '../components/Button.vue';
import Footer from '../components/Footer.vue';
import Navbar from '../components/Navbar.vue';
import icon from '/assets/images/icon.png'
import pointer from '/assets/images/pointer.png'

</script>

<template>
    <Navbar :center="['Home']" />
    <div class="content">
        <div class="section s1">
            <img class="favicon" :src="icon" alt="logo da vote já">
        </div>
        <div class="section s2">
            <h1 class="h1">Treinar seu Voto nunca foi tão fácil</h1>
            <h2 class="h2">100% educacional</h2>
        </div>
        <div class="section s3">
            <Button>Iniciar Simulação
                <img class="pointer" :src="pointer" alt="pointer image">
            </Button>
            
        </div>
    </div>
    <Footer />
</template>

<style>
.content {
    flex: 1;
    text-align: center;
}

.section {
    width: 100%;
    padding: 20px;
    display: flex;
}

.s1 {
    background-color: var(--color-secondary);
    justify-content: center;
}

.s2 {
    flex-direction: column;
    align-items: center;
}

.s3 {
    justify-content: center;
}

.s3 > Button {
    position: relative;
    background-color: var(--color-background-contrast);
    justify-content: center;
}

.pointer {
    position: absolute;
    min-width: 40px;
    width: 4vw;
    max-width: 60px;
    bottom: 0px;
    right: 0px;
    transform: translate(20px,25px);
}

.favicon {
    width: 500px;
}
</style>