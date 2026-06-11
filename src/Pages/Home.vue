<script setup lang="ts">
import Button from '../components/Button.vue';
import Footer from '../components/Footer.vue';
import Navbar from '../components/Navbar.vue';
import icon from '/assets/images/icon.png';
import pointer from '/assets/images/pointer.png';
</script>

<template>
  <Navbar :center="[{text: 'Inicio', path: '/'}, {text: 'Simulador', path: '/simulator'}]" />
  
  <main class="home-wrapper">
    <div class="hero-container">
      
      <!-- Coluna de Texto / Chamada para Ação -->
      <section class="hero-text-side">
        
        <h1 class="main-title">
          Treine seu voto no <br>
          <span class="highlight-text">Simulador de Urna</span>
        </h1>
        
        <p class="main-description">
          Pratique de forma rápida, segura e realista. Conheça a interface da urna eletrônica e prepare-se para exercer a sua cidadania com total confiança.
        </p>
        
        <div class="action-block">
          <router-link to="/simulator" class="start-btn-link">
            <Button>
              Iniciar Simulação
              <img class="click-pointer" :src="pointer" alt="Ponteiro de clique">
            </Button>
          </router-link>
        </div>
      </section>

      <!-- Coluna da Imagem / Identidade Visual -->
      <section class="hero-image-side">
        <div class="logo-card-bg">
          <img class="brand-logo" :src="icon" alt="Logo VoteJá">
        </div>
      </section>

    </div>
  </main>

  <Footer />
</template>

<style scoped>
/* Reset estrutural e alinhamento centralizado na tela */
.home-wrapper {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 60px 24px;
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    box-sizing: border-box;
    min-height: calc(100vh - 140px); /* Desconta Navbar e Footer aproximados */
}

/* Container do Hero em Grid (2 colunas no desktop, 1 no mobile) */
.hero-container {
    display: grid;
    grid-template-columns: 1.1fr 0.9fr;
    gap: 60px;
    align-items: center;
    width: 100%;
}

@media (max-width: 900px) {
    .hero-container {
        grid-template-columns: 1fr;
        text-align: center;
        gap: 40px;
    }
}

/* Lado do Texto */
.hero-text-side {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 24px;
}

@media (max-width: 900px) {
    .hero-text-side {
        align-items: center;
    }
}

/* Badge Superior */
.education-badge {
    background-color: var(--color-primary);
    color: var(--color-primary-contrast);
    padding: 6px 16px;
    border-radius: 30px;
    font-size: 0.85rem;
    font-weight: bold;
    font-family: var(--font-heading);
    letter-spacing: 0.5px;
}

/* Títulos e Textos */
.main-title {
    font-size: 3.2rem;
    line-height: 1.15;
    font-family: var(--font-heading);
    font-weight: 300;
    color: var(--color-text);
    margin: 0;
}

@media (max-width: 600px) {
    .main-title {
        font-size: 2.4rem;
    }
}

.highlight-text {
    font-weight: bold;
    color: var(--color-primary);
}

.main-description {
    font-size: 1.2rem;
    line-height: 1.6;
    color: var(--color-text);
    opacity: 0.9;
    margin: 0;
    max-width: 540px;
}

/* Wrapper do Botão de Ação */
.action-block {
    margin-top: 8px;
}

.start-btn-link {
    text-decoration: none;
    display: inline-block;
}

/* Estilização customizada em cima do componente Button genérico */
.start-btn-link > Button {
    position: relative;
    background-color: var(--color-background-contrast);
    color: var(--color-text-contrast);
    padding: 16px 36px;
    font-size: 1.2rem;
    font-family: var(--font-heading);
    font-weight: bold;
    border-radius: 8px;
    cursor: pointer;
    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.start-btn-link:hover > Button {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
}

/* Pointer Indicator */
.click-pointer {
    position: absolute;
    width: 44px;
    bottom: -18px;
    right: -15px;
    transition: transform 0.2s ease;
}

.start-btn-link:hover .click-pointer {
    transform: translate(4px, 4px) scale(1.05);
}

/* Lado da Imagem / Logo Box */
.hero-image-side {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
}

.logo-card-bg {
    background-color: var(--color-secondary);
    padding: 40px;
    border-radius: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    max-width: 420px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
}

.brand-logo {
    width: 100%;
    height: auto;
    max-height: 280px;
    object-fit: contain;
}
</style>