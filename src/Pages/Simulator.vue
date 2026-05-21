<script setup lang="ts">
import { ref } from 'vue';
import Urna from '../components/Urna/Urna.vue';
import Navbar from '../components/Navbar.vue';
import Footer from '../components/Footer.vue';


</script>

<template>
    <Navbar :center="['Simulador']" />
    <Urna/>
    <Footer />
</template>

<style>

</style>