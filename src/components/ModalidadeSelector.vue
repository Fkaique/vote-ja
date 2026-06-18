<script setup lang="ts">
const emit = defineEmits<{
    (e: 'select', modalidade: 'nacional' | 'municipal'): void
}>();
</script>

<template>
    <div class="modalidade-container">
        <header class="modalidade-header">
            <h3>Escolha a Modalidade</h3>
            <p class="modalidade-subtitulo">Selecione o ciclo eleitoral que deseja simular</p>
        </header>

        <div class="modalidade-cards">
            <button class="modalidade-card" @click="emit('select', 'nacional')">
                <span class="card-icone">🇧🇷</span>
                <div class="card-textos">
                    <strong class="card-titulo">Eleição Nacional</strong>
                    <span class="card-descricao">Simule a votação para Presidente da República</span>
                </div>
                <span class="card-seta">→</span>
            </button>

            <button class="modalidade-card" @click="emit('select', 'municipal')">
                <span class="card-icone">🏙️</span>
                <div class="card-textos">
                    <strong class="card-titulo">Eleição Municipal</strong>
                    <span class="card-descricao">Simule a votação para Prefeito e Vereador</span>
                </div>
                <span class="card-seta">→</span>
            </button>
        </div>
    </div>
</template>

<style scoped>
.modalidade-container {
    display: flex;
    flex-direction: column;
    gap: 32px;
    width: 100%;
    background-color: var(--color-background);
    color: var(--color-text);
    box-sizing: border-box;
    padding: 16px 0;
    font-family: var(--font-sans-serif);
    justify-content: center;
}

.modalidade-header {
    text-align: center;
}

.modalidade-header h3 {
    margin: 0 0 8px 0;
    font-family: var(--font-heading);
    font-size: 1.6rem;
    font-weight: bold;
}

.modalidade-subtitulo {
    margin: 0;
    font-size: 1rem;
    opacity: 0.75;
}

.modalidade-cards {
    display: flex;
    flex-direction: column;
    gap: 16px;
    max-width: 560px;
    width: 100%;
    margin: 0 auto;
}

.modalidade-card {
    display: flex;
    align-items: center;
    gap: 18px;
    background-color: var(--color-secondary);
    border: 2px solid transparent;
    border-radius: 12px;
    padding: 22px 24px;
    cursor: pointer;
    text-align: left;
    width: 100%;
    transition: border-color 0.2s, transform 0.15s, box-shadow 0.2s;
    color: var(--color-text);
    font-family: var(--font-sans-serif);
}

.modalidade-card:hover {
    border-color: var(--color-primary);
    transform: translateY(-2px);
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.12);
}

.card-icone {
    font-size: 2.2rem;
    flex-shrink: 0;
}

.card-textos {
    display: flex;
    flex-direction: column;
    gap: 4px;
    flex: 1;
}

.card-titulo {
    font-family: var(--font-heading);
    font-size: 1.15rem;
    font-weight: bold;
}

.card-descricao {
    font-size: 0.88rem;
    opacity: 0.75;
}

.card-seta {
    font-size: 1.3rem;
    opacity: 0.4;
    transition: opacity 0.2s, transform 0.2s;
    flex-shrink: 0;
}

.modalidade-card:hover .card-seta {
    opacity: 1;
    transform: translateX(4px);
    color: var(--color-primary);
}

@media (max-width: 480px) {
    .modalidade-container {
        padding: 16px;
        gap: 24px;
    }

    .modalidade-header h3 {
        font-size: 1.3rem;
    }

    .modalidade-card {
        padding: 16px;
        gap: 14px;
    }

    .card-icone {
        font-size: 1.8rem;
    }
}
</style>
