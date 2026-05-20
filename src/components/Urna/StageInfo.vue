<!-- src/components/Urna/StageInfo.vue -->
<script setup lang="ts">
import type { Cargo } from '@/types/Candidate'

defineProps<{
  cargos: Cargo[]
  etapaAtual: number
}>()
</script>

<template>
  <div class="stage-info">

    <div
      v-for="(cargo, index) in cargos"
      :key="cargo.nome"
      class="stage-info__item"
      :class="{
        'stage-info__item--done':   index < etapaAtual,
        'stage-info__item--active': index === etapaAtual,
        'stage-info__item--next':   index > etapaAtual,
      }"
    >
      <div class="stage-info__dot" />
      <span class="stage-info__nome">{{ cargo.nome }}</span>
    </div>

  </div>
</template>

<style scoped>
.stage-info {
  display: flex;
  align-items: center;
  gap: 4px;
  width: 100%;
  padding: 8px 12px;
  background-color: var(--color-cinza-1);
  border-radius: 6px;
}

.stage-info__item {
  display: flex;
  align-items: center;
  gap: 6px;
  flex: 1;
  position: relative;
  opacity: 0.3;
  transition: opacity 0.3s;
}

.stage-info__item:not(:last-child)::after {
  content: '';
  position: absolute;
  right: -4px;
  top: 50%;
  transform: translateY(-50%);
  width: 8px;
  height: 1px;
  background-color: var(--color-cinza-3);
}

.stage-info__item--done {
  opacity: 0.5;
}

.stage-info__item--done .stage-info__dot {
  background-color: var(--color-verde-base);
  border-color: var(--color-verde-base);
}

.stage-info__item--active {
  opacity: 1;
}

.stage-info__item--active .stage-info__dot {
  background-color: var(--color-verde-base);
  border-color: var(--color-verde-base);
  box-shadow: 0 0 8px var(--color-verde-base);
  animation: pulse 1.5s infinite;
}

.stage-info__item--active .stage-info__nome {
  color: var(--color-verde-base);
}

.stage-info__dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  border: 1px solid var(--color-cinza-3);
  background-color: transparent;
  flex-shrink: 0;
  transition: all 0.3s;
}

.stage-info__nome {
  font-family: var(--font-mono);
  font-size: 0.6rem;
  letter-spacing: 2px;
  color: var(--color-cinza-3);
  text-transform: uppercase;
  white-space: nowrap;
}

@keyframes pulse {
  0%, 100% { box-shadow: 0 0 4px var(--color-verde-base); }
  50%       { box-shadow: 0 0 12px var(--color-verde-base); }
}
</style>