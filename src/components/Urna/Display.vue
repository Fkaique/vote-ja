<!-- src/components/Urna/Display.vue -->
<script setup lang="ts">
import VoteDigits from './VoteDigits.vue'
import CandidateInfo from './CandidateInfo.vue'
import type { Candidate, TipoVoto } from '@/types/Candidate'

defineProps<{
  digitado: string
  digitos: number
  branco: boolean
  candidato: Candidate | null
  tipoVoto: TipoVoto | null
  cargo: string
}>()
</script>

<template>
  <div class="display">

    <div class="display__screen">

      <!-- Cabeçalho -->
      <div class="display__header">
        <span class="display__label">VOTAÇÃO EM ANDAMENTO</span>
        <span class="display__cargo">{{ cargo }}</span>
      </div>

      <div class="display__divider" />

      <!-- Dígitos -->
      <div class="display__section">
        <span class="display__section-label">NÚMERO:</span>
        <VoteDigits
          :digitado="digitado"
          :digitos="digitos"
          :branco="branco"
        />
      </div>

      <div class="display__divider" />

      <!-- Candidato -->
      <div class="display__section">
        <CandidateInfo
          :candidato="candidato"
          :tipo-voto="tipoVoto"
          :cargo="cargo"
        />
      </div>

    </div>

  </div>
</template>

<style scoped>
.display {
  width: 100%;
  padding: 8px;
  background-color: var(--color-cinza-1);
  border-radius: 8px;
}

.display__screen {
  background-color: var(--color-preto);
  border-radius: 6px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-height: 260px;

  /* efeito scanline sutil */
  background-image: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 2px,
    rgba(0, 255, 55, 0.02) 2px,
    rgba(0, 255, 55, 0.02) 4px
  );
}

.display__header {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.display__label {
  font-family: var(--font-mono);
  font-size: 0.65rem;
  letter-spacing: 3px;
  color: var(--color-cinza-3);
  text-transform: uppercase;
}

.display__cargo {
  font-family: var(--font-mono);
  font-size: 1.3rem;
  font-weight: bold;
  letter-spacing: 4px;
  color: var(--color-verde-base);
  text-transform: uppercase;
}

.display__divider {
  height: 1px;
  background-color: var(--color-cinza-base);
  opacity: 0.4;
}

.display__section {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.display__section-label {
  font-family: var(--font-mono);
  font-size: 0.65rem;
  letter-spacing: 3px;
  color: var(--color-cinza-3);
  text-transform: uppercase;
}
</style>