<script setup lang="ts">
import { ref, computed } from 'vue';

// Importação das imagens do tutorial
import page1 from '../assets/page1.png';
import page2 from '../assets/page2.png';
import page3 from '../assets/page3.png';
import page4 from '../assets/page4.png';
import page5 from '../assets/page5.png';
import page6 from '../assets/page6.png';

// Definição dos eventos que o componente pode disparar para o pai
const emit = defineEmits(['close']);

// Lista indexada das páginas do tutorial
const tutorialPages = [page1, page2, page3, page4, page5, page6];
const currentPage = ref(0);

// Computed para verificar se está na primeira ou última página
const isFirstPage = computed(() => currentPage.value === 0);
const isLastPage = computed(() => currentPage.value === tutorialPages.length - 1);

// Funções de navegação
function nextPage() {
    if (!isLastPage.value) {
        currentPage.value++;
    }
}

function prevPage() {
    if (!isFirstPage.value) {
        currentPage.value--;
    }
}

function setPage(index: number) {
    currentPage.value = index;
}

function finishTutorial() {
    emit('close');
}
</script>

<template>
    <div class="tutorial-container">
        <!-- Cabeçalho Interno do Slide -->
        <header class="tutorial-header">
            <h3>Guia de Votação — Passo {{ currentPage + 1 }} de {{ tutorialPages.length }}</h3>
            <button class="btn-skip" @click="finishTutorial">Pular Tutorial ×</button>
        </header>

        <!-- Área Central: Visualização da Imagem Atual -->
        <div class="tutorial-viewport">
            <transition name="slide-fade" mode="out-in">
                <img 
                    :key="currentPage" 
                    :src="tutorialPages[currentPage]" 
                    :alt="`Passo do tutorial ${currentPage + 1}`" 
                    class="tutorial-image"
                />
            </transition>
        </div>

        <!-- Rodapé Dinâmico com Navegação e Indicadores -->
        <footer class="tutorial-footer">
            <!-- Botão Voltar (Esquerda) -->
            <button 
                class="nav-arrow-btn" 
                :disabled="isFirstPage" 
                @click="prevPage"
                title="Página Anterior"
            >
                ← Voltar
            </button>

            <!-- Indicadores de Bolinha (Dots) Centrais -->
            <div class="navigation-dots">
                <button 
                    v-for="(_, index) in tutorialPages"
                    :key="index"
                    class="dot-indicator"
                    :class="{ 'dot-active': index === currentPage }"
                    @click="setPage(index)"
                    :aria-label="`Ir para página ${index + 1}`"
                ></button>
            </div>

            <!-- Botão Avançar / Concluir (Direita) -->
            <button 
                v-if="!isLastPage"
                class="nav-arrow-btn advance" 
                @click="nextPage"
                title="Próxima Página"
            >
                Avançar →
            </button>
            <button 
                v-else
                class="nav-arrow-btn finish-btn" 
                @click="finishTutorial"
                title="Começar Simulação"
            >
                Começar!
            </button>
        </footer>
    </div>
</template>

<style scoped>
.tutorial-container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    height: 100%;
    background-color: var(--color-background);
    color: var(--color-text);
    box-sizing: border-box;
    padding: 20px;
    font-family: var(--font-sans-serif);
}

/* Cabeçalho superior */
.tutorial-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid var(--color-secondary);
    padding-bottom: 12px;
}

.tutorial-header h3 {
    margin: 0;
    font-family: var(--font-heading);
    font-size: 1.2rem;
    font-weight: bold;
}

.btn-skip {
    background: none;
    border: none;
    color: var(--color-text);
    opacity: 0.6;
    cursor: pointer;
    font-size: 0.9rem;
    font-weight: bold;
    transition: opacity 0.2s;
}

.btn-skip:hover {
    opacity: 1;
}

/* Viewport da imagem */
.tutorial-viewport {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px 0;
    overflow: hidden;
}

.tutorial-image {
    max-width: 100%;
    max-height: 60vh; /* Garante que sobra espaço para o cabeçalho e rodapé */
    object-fit: contain;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

/* Rodapé e Controles */
.tutorial-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid var(--color-secondary);
    padding-top: 16px;
}

.nav-arrow-btn {
    background-color: var(--color-secondary);
    color: var(--color-text);
    border: none;
    padding: 10px 20px;
    border-radius: 6px;
    font-weight: bold;
    font-size: 0.95rem;
    cursor: pointer;
    transition: background-color 0.2s, opacity 0.2s;
    min-width: 100px;
}

.nav-arrow-btn:disabled {
    opacity: 0.3;
    cursor: not-allowed;
}

.nav-arrow-btn:not(:disabled):hover {
    background-color: var(--color-primary);
    color: var(--color-primary-contrast);
}

/* Botões de destaque de avanço e finalização */
.nav-arrow-btn.advance {
    background-color: var(--color-primary);
    color: var(--color-primary-contrast);
}

.nav-arrow-btn.finish-btn {
    background-color: #008822; /* Verde padrão confirma */
    color: white;
}

/* Bolinhas centrais (Dots de navegação) */
.navigation-dots {
    display: flex;
    gap: 8px;
}

.dot-indicator {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    border: none;
    background-color: var(--color-secondary);
    cursor: pointer;
    transition: transform 0.2s, background-color 0.2s;
    padding: 0;
}

.dot-indicator:hover {
    transform: scale(1.2);
}

.dot-active {
    background-color: var(--color-primary);
    transform: scale(1.2);
}

/* Animação de transição das fotos (Slide sutil) */
.slide-fade-enter-active,
.slide-fade-leave-active {
    transition: all 0.2s ease-out;
}

.slide-fade-enter-from {
    transform: translateX(20px);
    opacity: 0;
}

.slide-fade-leave-to {
    transform: translateX(-20px);
    opacity: 0;
}
</style>