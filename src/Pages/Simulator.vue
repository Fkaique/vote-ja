<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Urna from '../components/Urna/Urna.vue';
import Navbar from '../components/Navbar.vue';
import Footer from '../components/Footer.vue';
import VoterTutorial from '../components/VoterTutorial.vue';

// Buscando os dados dos candidatos para listar na colinha lateral
import candidatosData from '../data/candidatos.json';

interface Candidato {
    id: number;
    name: string;
    numero: number;
    partido: string;
    cargo: string;
}

// Controle de visibilidade do menu suspenso do tutorial
const showTutorial = ref(false);

// Abre o tutorial automaticamente quando o usuário entra na página
onMounted(() => {
    showTutorial.value = true;
});

function openTutorial() {
    showTutorial.value = true;
}

function closeTutorial() {
    showTutorial.value = false;
}

// Extraindo a lista tratada de candidatos
const candidatos: Candidato[] = Array.isArray(candidatosData) 
  ? candidatosData 
  : (candidatosData as any).candidatos || [];
</script>

<template>
  <Navbar :center="['Simulador']" />
  
  <main class="simulation-screen">
    <!-- Menu Suspenso (Overlay Modal) do Tutorial -->
    <div v-if="showTutorial" class="tutorial-overlay" @click.self="closeTutorial">
      <div class="tutorial-modal-box">
        <VoterTutorial @close="closeTutorial" />
      </div>
    </div>

    <!-- Cabeçalho Dinâmico da Simulação -->
    <header class="simulation-header">
      <h1 class="sim-title">Ambiente de Votação</h1>
      <p class="sim-subtitle">Pratique seu voto na cabine virtual. Suas ações aqui são estritamente educacionais.</p>
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
            <Urna />
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
              v-for="candidato in candidatos" 
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

            <div v-if="candidatos.length === 0" class="no-data">
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
    padding: 40px 24px;
    width: 100%;
    max-width: 1300px;
    margin: 0 auto;
    box-sizing: border-box;
    gap: 32px;
}

/* Camada escura de fundo do Menu Suspenso (Modal) */
.tutorial-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.7); /* Backdrop escuro fosco */
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999; /* Garante que fica por cima de absolutamente tudo */
    padding: 24px;
    box-sizing: border-box;
}

/* Caixa interna que limita o tamanho do tutorial na tela */
.tutorial-modal-box {
    width: 100%;
    max-width: 900px;
    height: 85vh; /* Ocupa quase toda a altura da tela */
    background-color: var(--color-background);
    border-radius: 12px;
    overflow: hidden;
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
}

.sim-title {
    font-size: 2.2rem;
    font-family: var(--font-heading);
    color: var(--color-text);
    margin: 0 0 8px 0;
}

.sim-subtitle {
    font-size: 1.1rem;
    color: var(--color-text);
    opacity: 0.8;
    margin: 0;
}

/* Layout Estrutural */
.simulation-layout {
    display: grid;
    grid-template-columns: 1.4fr 0.6fr;
    gap: 40px;
    width: 100%;
    align-items: start;
}

@media (max-width: 1024px) {
    .simulation-layout {
        grid-template-columns: 1fr;
        gap: 32px;
    }
}

/* A Cabine de Votação */
.voting-booth {
    width: 100%;
    display: flex;
    justify-content: center;
}

.booth-shield {
    background-color: var(--color-secondary);
    border: 2px solid var(--color-titanium-2);
    border-radius: 16px;
    width: 100%;
    padding: 30px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);
    position: relative;
    box-sizing: border-box;
}

.booth-top-bar {
    display: flex;
    gap: 8px;
    position: absolute;
    top: 14px;
    left: 20px;
}

.booth-top-bar .dot {
    width: 10px;
    height: 10px;
    background-color: var(--color-titanium-3);
    border-radius: 50%;
}

.urna-wrapper {
    margin-top: 10px;
    width: 100%;
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
    font-size: 1.05rem;
    padding: 16px;
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

.btn-reopen-tutorial:active {
    transform: translateY(0);
}

.icon-book {
    font-size: 1.2rem;
}

/* Cartão de Cola Eleitoral */
.voter-help-card {
    background-color: var(--color-background);
    border: 2px dashed var(--color-secondary);
    border-radius: 12px;
    padding: 24px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.card-header h3 {
    font-family: var(--font-heading);
    font-size: 1.3rem;
    color: var(--color-text);
    margin: 0 0 6px 0;
}

.card-header p {
    font-size: 0.9rem;
    color: var(--color-text);
    opacity: 0.75;
    margin: 0;
}

/* Lista de candidatos */
.candidates-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
    max-height: 400px;
    overflow-y: auto;
    padding-right: 6px;
}

.candidate-sticky {
    background-color: var(--color-secondary);
    color: var(--color-text);
    padding: 12px 16px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    border-left: 5px solid var(--color-primary);
}

.cand-cargo {
    font-size: 0.75rem;
    font-weight: bold;
    text-transform: uppercase;
    background-color: var(--color-background);
    padding: 4px 8px;
    border-radius: 4px;
    font-family: var(--font-mono);
}

.cand-info {
    display: flex;
    flex-direction: column;
    flex: 1;
}

.cand-name {
    font-weight: bold;
    font-size: 0.95rem;
}

.cand-party {
    font-size: 0.8rem;
    opacity: 0.75;
}

.cand-number-badge {
    font-family: var(--font-mono);
    font-size: 1.2rem;
    font-weight: bold;
    color: var(--color-primary);
    background-color: var(--color-background);
    padding: 4px 10px;
    border-radius: 6px;
    letter-spacing: 1px;
}

.no-data {
    text-align: center;
    font-size: 0.9rem;
    opacity: 0.6;
    padding: 20px 0;
}
</style>