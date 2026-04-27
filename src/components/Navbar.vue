<script setup lang="ts">

defineProps<{
    left?: string[],
    center?: string[],
    right?: string[]
}>()

</script>

<template>
    <div class="nav">
        <div class="leftNav">
            <a href="#" class="item" v-for="item, i in left" :key="i">{{ item }}</a href="#">
        </div>
        <div class="centerNav">
            <a href="#" class="item" v-for="item, i in center" :key="i">{{ item }}</a href="#">
        </div>
        <div class="rightNav">
            <a href="#" class="item" v-for="item, i in right" :key="i">{{ item }}</a href="#">
        </div>
    </div>
</template>

<style>
.nav {
    display: flex;
    justify-content: space-between;
}

.nav >* {
    flex: 1;
    display: flex;
    align-items: center;
}
.leftNav {
    justify-content: start;
    font-size: 1.5rem;
}

.centerNav {
    justify-content: center;
    font-size: 2rem;
}

.rightNav {
    justify-content: end;
    font-size: 1.5rem;
}

</style>