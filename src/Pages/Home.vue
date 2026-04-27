<script setup lang="ts">
import Footer from '../components/Footer.vue';
import Navbar from '../components/Navbar.vue';

</script>

<template>
    <Navbar :left="['Item1', 'Item2']" :right="['Item3']" :center="['Home']" />
    <div class="content">

    </div>
    <Footer />
</template>

<style>
.content {
    flex: 1;
}
</style>