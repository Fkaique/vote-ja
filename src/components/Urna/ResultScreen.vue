<!-- src/components/Urna/ResultScreen.vue -->
<script setup lang="ts">
import type { Voto } from '@/types/Candidate'

defineProps<{
  votos: Voto[]
}>()

defineEmits<{
  reiniciar: []
}>()

function corVoto(tipo: string) {
  if (tipo === 'nominal') return 'result-screen__voto-nome--nominal'
  if (tipo === 'branco')  return 'result-screen__voto-nome--branco'
  if (tipo === 'nulo')    return 'result-screen__voto-nome--nulo'
  return ''
}
</script>

<template>
  <div class="result-screen">

    <!-- Título -->
    <div class="result-screen__header">
      <p class="result-screen__label">VOTAÇÃO ENCERRADA</p>
      <h1 class="result-screen__fim">FIM</h1>
    </div>

    <div class="result-screen__divider" />

    <!-- Resumo dos votos -->
    <div class="result-screen__resumo">
      <p class="result-screen__resumo-label">RESUMO DA VOTAÇÃO</p>

      <div
        v-for="voto in votos"
        :key="voto.cargo"
        class="result-screen__voto"
      >
        <span class="result-screen__voto-cargo">{{ voto.cargo }}</span>

        <span
          class="result-screen__voto-nome"
          :class="corVoto(voto.tipo)"
        >
          <template v-if="voto.tipo === 'nominal' && voto.candidato">
            {{ voto.candidato.nome }}
            <span class="result-screen__voto-partido">
              · {{ voto.candidato.partido }}
            </span>
          </template>
          <template v-else-if="voto.tipo === 'branco'">BRANCO</template>
          <template v-else>NULO</template>
        </span>
      </div>
    </div>

    <div class="result-screen__divider" />

    <!-- Botão reiniciar -->
    <button
      class="result-screen__btn"
      @click="$emit('reiniciar')"
    >
      ↺ &nbsp; NOVA VOTAÇÃO
    </button>

  </div>
</template>

<style scoped>
.result-screen {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  width: 100%;
  min-height: 400px;
  background-color: var(--color-preto);
  border-radius: 6px;
  padding: 32px 24px;
}

/* Header */
.result-screen__header {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.result-screen__label {
  font-family: var(--font-mono);
  font-size: 0.65rem;
  letter-spacing: 4px;
  color: var(--color-cinza-3);
  text-transform: uppercase;
}

.result-screen__fim {
  font-family: var(--font-mono);
  font-size: 4rem;
  font-weight: bold;
  letter-spacing: 12px;
  color: var(--color-verde-base);
  text-shadow:
    0 0 20px var(--color-verde-base),
    0 0 40px var(--color-verde-2);
  animation: glow 2s infinite;
}

@keyframes glow {
  0%, 100% { text-shadow: 0 0 20px var(--color-verde-base); }
  50%       { text-shadow: 0 0 40px var(--color-verde-base), 0 0 60px var(--color-verde-2); }
}

/* Divider */
.result-screen__divider {
  width: 100%;
  height: 1px;
  background-color: var(--color-cinza-base);
  opacity: 0.3;
}

/* Resumo */
.result-screen__resumo {
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  max-width: 420px;
}

.result-screen__resumo-label {
  font-family: var(--font-mono);
  font-size: 0.65rem;
  letter-spacing: 3px;
  color: var(--color-cinza-3);
  text-transform: uppercase;
  margin-bottom: 4px;
}

.result-screen__voto {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid var(--color-cinza-1);
}

.result-screen__voto-cargo {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  letter-spacing: 2px;
  color: var(--color-cinza-3);
  text-transform: uppercase;
}

.result-screen__voto-nome {
  font-family: var(--font-mono);
  font-size: 0.85rem;
  font-weight: bold;
  text-align: right;
  text-transform: uppercase;
}

.result-screen__voto-nome--nominal { color: var(--color-verde-base); }
.result-screen__voto-nome--branco  { color: var(--color-azul-base);  }
.result-screen__voto-nome--nulo    { color: var(--color-vermelho-base); }

.result-screen__voto-partido {
  font-weight: normal;
  font-size: 0.75rem;
  color: var(--color-cinza-3);
}

/* Botão */
.result-screen__btn {
  font-family: var(--font-mono);
  font-size: 0.8rem;
  letter-spacing: 3px;
  color: var(--color-cinza-3);
  background: transparent;
  border: 1px solid var(--color-cinza-base);
  border-radius: 6px;
  padding: 12px 32px;
  cursor: pointer;
  text-transform: uppercase;
  transition: all 0.2s;
}

.result-screen__btn:hover {
  border-color: var(--color-verde-base);
  color: var(--color-verde-base);
}
</style>