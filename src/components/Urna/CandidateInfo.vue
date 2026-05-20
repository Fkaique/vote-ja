<!-- src/components/Urna/CandidateInfo.vue -->
<script setup lang="ts">
import type { Candidate, TipoVoto } from '@/types/Candidate'

defineProps<{
  candidato: Candidate | null
  tipoVoto: TipoVoto | null
  cargo: string
}>()
</script>

<template>
  <div class="candidate-info">

    <!-- Aguardando digitação -->
    <template v-if="tipoVoto === null">
      <p class="candidate-info__label">DIGITE O NÚMERO DO CANDIDATO</p>
      <p class="candidate-info__nome candidate-info__nome--vazio">_ _ _</p>
    </template>

    <!-- Voto nominal -->
    <template v-else-if="tipoVoto === 'nominal' && candidato">
      <p class="candidate-info__label">CANDIDATO</p>
      <p class="candidate-info__nome">{{ candidato.nome }}</p>
      <p class="candidate-info__partido">{{ candidato.partido }}</p>
      <p v-if="candidato.vice" class="candidate-info__vice">
        VICE: {{ candidato.vice }}
      </p>
    </template>

    <!-- Voto nulo -->
    <template v-else-if="tipoVoto === 'nulo'">
      <p class="candidate-info__label">NÚMERO INVÁLIDO</p>
      <p class="candidate-info__nome candidate-info__nome--nulo">VOTO NULO</p>
      <p class="candidate-info__sub">Confirme ou corrija</p>
    </template>

    <!-- Voto em branco -->
    <template v-else-if="tipoVoto === 'branco'">
      <p class="candidate-info__label">VOTO EM BRANCO</p>
      <p class="candidate-info__nome candidate-info__nome--branco">BRANCO</p>
      <p class="candidate-info__sub">Confirme ou corrija</p>
    </template>

  </div>
</template>

<style scoped>
.candidate-info {
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-height: 100px;
}

.candidate-info__label {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  letter-spacing: 3px;
  color: var(--color-cinza-3);
  text-transform: uppercase;
}

.candidate-info__nome {
  font-family: var(--font-mono);
  font-size: 1.4rem;
  font-weight: bold;
  color: var(--color-verde-base);
  text-transform: uppercase;
}

.candidate-info__nome--vazio {
  color: var(--color-cinza-3);
  letter-spacing: 8px;
}

.candidate-info__nome--nulo {
  color: var(--color-vermelho-base);
}

.candidate-info__nome--branco {
  color: var(--color-azul-base);
}

.candidate-info__partido {
  font-family: var(--font-mono);
  font-size: 1rem;
  color: var(--color-verde-3);
  letter-spacing: 2px;
}

.candidate-info__vice {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--color-cinza-3);
  letter-spacing: 1px;
}

.candidate-info__sub {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--color-cinza-3);
  letter-spacing: 1px;
}
</style>