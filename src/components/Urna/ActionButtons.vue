<!-- src/components/Urna/ActionButtons.vue -->
<script setup lang="ts">
defineEmits<{
  branco:   []
  corrige:  []
  confirma: []
}>()

defineProps<{
  prontoParaConfirmar: boolean
}>()
</script>

<template>
  <div class="action-buttons">

    <button
      class="action-btn action-btn--branco"
      @click="$emit('branco')"
    >
      BRANCO
    </button>

    <button
      class="action-btn action-btn--corrige"        
      @click="$emit('corrige')"
    >
      CORRIGE
    </button>

    <button
      class="action-btn action-btn--confirma"
      :disabled="!prontoParaConfirmar"
      @click="$emit('confirma')"
    >
      CONFIRMA
    </button>

  </div>
</template>

<style scoped>
.action-buttons {
  display: flex;
  gap: 10px;
  width: 100%;
}

.action-btn {
  flex: 1;
  padding: 14px 8px;
  border: none;
  border-radius: 6px;
  font-family: var(--font-mono);
  font-size: 0.85rem;
  font-weight: bold;
  letter-spacing: 2px;
  cursor: pointer;
  transition: filter 0.15s, transform 0.1s;
}

.action-btn:active {
  transform: translateY(2px);
  filter: brightness(0.85);
}

/* BRANCO */
.action-btn--branco {
  background-color: var(--color-azul-base);
  color: var(--color-branco);
}
.action-btn--branco:hover {
  filter: brightness(1.15);
}

/* CORRIGE */
.action-btn--corrige {
  background-color: var(--color-vermelho-base);
  color: var(--color-branco);
}
.action-btn--corrige:hover {
  filter: brightness(1.15);
}

/* CONFIRMA */
.action-btn--confirma {
  background-color: var(--color-verde-base);
  color: var(--color-preto);
}
.action-btn--confirma:hover:not(:disabled) {
  filter: brightness(1.15);
}

.action-btn--confirma:disabled {
  background-color: var(--color-verde-1);
  color: var(--color-cinza-base);
  cursor: not-allowed;
  transform: none;
}
</style>