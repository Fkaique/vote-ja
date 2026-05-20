<!-- src/Pages/Simulator.vue -->
<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { useUrna } from '@/composables/useUrna'
import { cargos } from '@/data/candidatos'

import Display       from '@/components/Urna/Display.vue'
import Urna          from '@/components/Urna/Urna.vue'
import ActionButtons from '@/components/Urna/ActionButtons.vue'
import StageInfo     from '@/components/Urna/StageInfo.vue'
import ResultScreen  from '@/components/Urna/ResultScreen.vue'

const {
  etapaAtual,
  digitado,
  votos,
  votoBranco,
  finalizado,
  cargoAtual,
  candidatoAtual,
  tipoVoto,
  prontoParaConfirmar,
  digitarNumero,
  corrigir,
  marcarBranco,
  confirmar,
  reiniciar,
  iniciarTeclado,
  pararTeclado,
} = useUrna()

onMounted(iniciarTeclado)
onUnmounted(pararTeclado)
</script>

<template>
  <div class="simulator">

    <!-- Tela final -->
    <ResultScreen
      v-if="finalizado"
      :votos="votos"
      @reiniciar="reiniciar"
    />

    <!-- Votação em andamento -->
    <template v-else>

      <StageInfo
        :cargos="cargos"
        :etapa-atual="etapaAtual"
      />

      <div class="simulator__urna">

        <Display
          :digitado="digitado"
          :digitos="cargoAtual.digitos"
          :branco="votoBranco"
          :candidato="candidatoAtual"
          :tipo-voto="tipoVoto"
          :cargo="cargoAtual.nome"
        />

        <div class="simulator__teclado">
          <Urna @digit-pressed="digitarNumero" />

          <ActionButtons
            :pronto-para-confirmar="prontoParaConfirmar"
            @branco="marcarBranco"
            @corrige="corrigir"
            @confirma="confirmar"
          />
        </div>

      </div>

    </template>

  </div>
</template>

<style scoped>
.simulator {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  width: 100%;
  max-width: 680px;
  margin: 0 auto;
  padding: 24px 16px;
}

.simulator__urna {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  width: 100%;
  background-color: var(--color-cinza-1);
  border-radius: 10px;
  padding: 16px;
}

.simulator__teclado {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

/* Mobile */
@media (max-width: 600px) {
  .simulator__urna {
    grid-template-columns: 1fr;
  }
}
</style>