<!-- src/components/Urna/VoteDigits.vue -->
<script setup lang="ts">
defineProps<{
  digitado: string
  digitos: number
  branco: boolean
}>()
</script>

<template>
  <div class="vote-digits">
    <div
      v-for="i in digitos"
      :key="i"
      class="digit-box"
      :class="{
        'digit-box--filled':  branco || digitado[i - 1] !== undefined,
        'digit-box--cursor':  !branco && digitado[i - 1] === undefined && digitado.length === i - 1,
        'digit-box--branco':  branco,
      }"
    >
      {{ branco ? '–' : digitado[i - 1] ?? '' }}
    </div>
  </div>
</template>

<style scoped>
.vote-digits {
  display: flex;
  gap: 8px;
}

.digit-box {
  width: 48px;
  height: 60px;
  background-color: var(--color-preto);
  border: 1px solid var(--color-cinza-base);
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-mono);
  font-size: 2rem;
  font-weight: bold;
  color: var(--color-verde-base);
  position: relative;
}

/* dígito preenchido */
.digit-box--filled {
  border-color: var(--color-verde-base);
}

/* cursor piscando na posição atual */
.digit-box--cursor::after {
  content: '';
  position: absolute;
  bottom: 6px;
  left: 8px;
  right: 8px;
  height: 2px;
  background-color: var(--color-verde-base);
  animation: blink 0.8s infinite;
}

/* voto em branco */
.digit-box--branco {
  color: var(--color-azul-base);
  border-color: var(--color-azul-base);
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0; }
}
</style>