<script setup lang="ts">
// Definindo a estrutura de cada link para o TypeScript
interface NavLink {
    text: string;
    path: string;
}

defineProps<{
    left?: NavLink[],
    center?: NavLink[],
    right?: NavLink[]
}>()

// Função utilitária para checar se o caminho é um link externo (http/https)
const isExternal = (path: string) => path.startsWith('http://') || path.startsWith('https://');
</script>

<template>
    <nav class="nav">
        <!-- Lado Esquerdo -->
        <div class="leftNav">
            <template v-for="item, i in left" :key="'left-' + i">
                <a v-if="isExternal(item.path)" :href="item.path" class="item">{{ item.text }}</a>
                <RouterLink v-else :to="item.path" class="item">{{ item.text }}</RouterLink>
            </template>
        </div>

        <!-- Centro -->
        <div class="centerNav">
            <template v-for="item, i in center" :key="'center-' + i">
                <a v-if="isExternal(item.path)" :href="item.path" class="item">{{ item.text }}</a>
                <RouterLink v-else :to="item.path" class="item">{{ item.text }}</RouterLink>
            </template>
        </div>

        <!-- Lado Direito -->
        <div class="rightNav">
            <template v-for="item, i in right" :key="'right-' + i">
                <a v-if="isExternal(item.path)" :href="item.path" class="item">{{ item.text }}</a>
                <RouterLink v-else :to="item.path" class="item">{{ item.text }}</RouterLink>
            </template>
        </div>
    </nav>
</template>

<style scoped>
.nav {
    display: flex;
    justify-content: space-between;
    width: 100%;
    box-sizing: border-box;
}

.nav > * {
    flex: 1;
    display: flex;
    align-items: center;
    gap: 20px;
}

.item {
    text-decoration: none;
    color: inherit;
    transition: opacity 0.2s;
}

.item:hover {
    opacity: 0.8;
}

.leftNav {
    justify-content: flex-start;
    font-size: 1.5rem;
}

.centerNav {
    justify-content: center;
    font-size: 2rem;
}

.rightNav {
    justify-content: flex-end;
    font-size: 1.5rem;
}
</style>