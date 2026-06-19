<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Urna from '../components/Urna/Urna.vue';
import Navbar from '../components/Navbar.vue';
import Footer from '../components/Footer.vue';
import VoterTutorial from '../components/VoterTutorial.vue';

import candidatosData from '../data/candidatos.json';

interface Candidato {
    id: number;
    name: string;
    numero: number;
    partido: string;
    cargo: string;
    modalidade: string;
}

const showTutorial = ref(false);
const modalidadeSelecionada = ref<'nacional' | 'municipal' | null>(null);

onMounted(() => {
    showTutorial.value = true;
});

function openTutorial() {
    showTutorial.value = true;
}

function closeTutorial(modalidade: 'nacional' | 'municipal') {
    modalidadeSelecionada.value = modalidade;
    showTutorial.value = false;
}

const todosCandidatos: Candidato[] = Array.isArray(candidatosData)
  ? candidatosData
  : (candidatosData as any).candidatos || [];

const candidatosDaColinha = () => {
    if (!modalidadeSelecionada.value) return todosCandidatos;
    return todosCandidatos.filter((c) => c.modalidade === modalidadeSelecionada.value);
};

const labelModalidade = () => {
    if (modalidadeSelecionada.value === 'nacional') return '🇧🇷 Eleição Nacional';
    if (modalidadeSelecionada.value === 'municipal') return '🏙️ Eleição Municipal';
    return '';
};
</script>

<template>
  <Navbar :center="[{text: 'Inicio', path: '/'}, {text: 'Simulador', path: '/simulator'}]" />
  
  <main class="simulation-screen">
    <!-- Menu Suspenso (Overlay Modal) do Tutorial -->
    <div v-if="showTutorial" class="tutorial-overlay" @click.self="() => {}">
      <div class="tutorial-modal-box">
        <VoterTutorial @close="(m) => closeTutorial(m)" />
      </div>
    </div>

    <!-- Cabeçalho Dinâmico da Simulação -->
    <header class="simulation-header">
      <h1 class="sim-title">Ambiente de Votação</h1>
      <p class="sim-subtitle">Pratique seu voto na cabine virtual. Suas ações aqui são estritamente educacionais.</p>
      <div v-if="modalidadeSelecionada" class="modalidade-badge">
        {{ labelModalidade() }}
      </div>
    </header>

    <div class="simulation-layout">
      
      <!-- Lado Esquerdo: Cabine e Dispositivo da Urna -->
      <section class="voting-booth">
        <div class="booth-shield">
          <div class="booth-top-bar">
            <span class="dot"></span>
            <span class="dot"></span>
            <span class="dot"></span>
          </div>
          <div class="urna-wrapper">
            <Urna :modalidade="modalidadeSelecionada" />
          </div>
        </div>
      </section>

      <!-- Lado Direito: Ações Extra e Cola Eleitoral -->
      <aside class="sidebar-controls">
        
        <!-- Botão para Rever o Tutorial -->
        <button class="btn-reopen-tutorial" @click="openTutorial">
          <span class="icon-book">📖</span> Rever Tutorial de Voto
        </button>

        <div class="voter-help-card">
          <div class="card-header">
            <h3>Colinha do Eleitor</h3>
            <p>Use estes números para testar o simulador:</p>
          </div>
          
          <div class="candidates-list">
            <div 
              v-for="candidato in candidatosDaColinha()" 
              :key="candidato.id" 
              class="candidate-sticky"
            >
              <span class="cand-cargo">{{ candidato.cargo }}</span>
              <div class="cand-info">
                <span class="cand-name">{{ candidato.name }}</span>
                <span class="cand-party">{{ candidato.partido }}</span>
              </div>
              <div class="cand-number-badge">{{ candidato.numero }}</div>
            </div>

            <div v-if="candidatosDaColinha().length === 0" class="no-data">
              <p>Nenhum candidato configurado no arquivo JSON.</p>
            </div>
          </div>
        </div>
      </aside>

    </div>
  </main>

  <Footer />
</template>

<style scoped>
/* Container Principal */
.simulation-screen {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 24px 16px;
    width: 100%;
    max-width: 1300px;
    margin: 0 auto;
    box-sizing: border-box;
    gap: 24px;
}

/* Camada escura de fundo do Menu Suspenso (Modal) */
.tutorial-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
    padding: 12px;
    box-sizing: border-box;
}

/* Caixa interna que limita o tamanho do tutorial na tela */
.tutorial-modal-box {
    width: 100%;
    max-width: 900px;
    max-height: calc(100vh - 24px); 
    background-color: var(--color-background);
    border-radius: 12px;
    overflow-y: auto;
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
    animation: modal-appear 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes modal-appear {
    from {
        transform: scale(0.95);
        opacity: 0;
    }
    to {
        transform: scale(1);
        opacity: 1;
    }
}

/* Cabeçalho da página */
.simulation-header {
    text-align: center;
    width: 100%;
    padding: 0 8px;
}

.sim-title {
    font-size: clamp(1.6rem, 5vw, 2.2rem);
    font-family: var(--font-heading);
    color: var(--color-text);
    margin: 0 0 8px 0;
}

.sim-subtitle {
    font-size: clamp(0.9rem, 3vw, 1.1rem);
    color: var(--color-text);
    opacity: 0.8;
    margin: 0;
}

/* Badge de modalidade selecionada */
.modalidade-badge {
    display: inline-block;
    margin-top: 10px;
    background-color: var(--color-primary);
    color: var(--color-primary-contrast);
    font-family: var(--font-heading);
    font-weight: bold;
    font-size: 0.9rem;
    padding: 5px 14px;
    border-radius: 20px;
    letter-spacing: 0.5px;
}

/* Layout Estrutural */
.simulation-layout {
    display: grid;
    grid-template-columns: 1.3fr 0.7fr;
    gap: 32px;
    width: 100%;
    align-items: start;
}

/* A Cabine de Votação */
.voting-booth {
    width: 100%;
    display: flex;
    justify-content: center;
    overflow: hidden;
}

.booth-shield {
    background-color: var(--color-secondary);
    border: 2px solid var(--color-titanium-2);
    border-radius: 16px;
    width: 100%;
    padding: 30px 20px 20px 20px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);
    position: relative;
    box-sizing: border-box;
}

.booth-top-bar {
    display: flex;
    gap: 8px;
    position: absolute;
    top: 12px;
    left: 20px;
}

.booth-top-bar .dot {
    width: 8px;
    height: 8px;
    background-color: var(--color-titanium-3);
    border-radius: 50%;
}

.urna-wrapper {
    margin-top: 10px;
    width: 100%;
    display: flex;
    justify-content: center;
}

/* Barra Lateral de Controles e Ajuda */
.sidebar-controls {
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 100%;
}

/* Botão "Rever Tutorial" */
.btn-reopen-tutorial {
    background-color: var(--color-primary);
    color: var(--color-primary-contrast);
    border: none;
    font-family: var(--font-heading);
    font-weight: bold;
    font-size: 1rem;
    padding: 14px;
    border-radius: 10px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s, box-shadow 0.2s;
}

.btn-reopen-tutorial:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.15);
}

/* Cartão de Cola Eleitoral */
.voter-help-card {
    background-color: var(--color-background);
    border: 2px dashed var(--color-secondary);
    border-radius: 12px;
    padding: 20px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.card-header h3 {
    font-family: var(--font-heading);
    font-size: 1.2rem;
    color: var(--color-text);
    margin: 0 0 4px 0;
}

.card-header p {
    font-size: 0.85rem;
    color: var(--color-text);
    opacity: 0.75;
    margin: 0;
}

/* Lista de candidatos */
.candidates-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
    max-height: 320px;
    overflow-y: auto;
    padding-right: 4px;
}

.candidate-sticky {
    background-color: var(--color-secondary);
    color: var(--color-text);
    padding: 10px 14px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    border-left: 4px solid var(--color-primary);
}

.cand-cargo {
    font-size: 0.7rem;
    font-weight: bold;
    text-transform: uppercase;
    background-color: var(--color-background);
    padding: 2px 6px;
    border-radius: 4px;
    font-family: var(--font-mono);
}

.cand-info {
    display: flex;
    flex-direction: column;
    flex: 1;
    min-width: 0;
}

.cand-name {
    font-weight: bold;
    font-size: 0.9rem;
    white-space: nowrap;
    color: var(--color-text-contrast);
    overflow: hidden;
    text-overflow: ellipsis;
    color: var(--color-text-contrast);
}

.cand-party {
    font-size: 0.75rem;
    color: var(--color-text-contrast);
    opacity: 0.75;
    color: var(--color-text-contrast);
}

.cand-number-badge {
    font-family: var(--font-mono);
    font-size: 1.1rem;
    font-weight: bold;
    color: var(--color-primary);
    background-color: var(--color-background);
    padding: 2px 8px;
    border-radius: 6px;
    letter-spacing: 0.5px;
}

.no-data {
    text-align: center;
    font-size: 0.85rem;
    opacity: 0.6;
    padding: 16px 0;
}

@media (max-width: 1024px) {
    .simulation-layout {
        grid-template-columns: 1fr;
        gap: 24px;
    }
}

@media (max-width: 480px) {
    .simulation-screen {
        padding: 16px 8px;
        gap: 16px;
    }
    
    .booth-shield {
        padding: 24px 10px 12px 10px;
        border-radius: 10px;
    }

    .candidate-sticky {
        padding: 8px 10px;
    }

    .cand-name {
        font-size: 0.85rem;
    }
}
</style>
