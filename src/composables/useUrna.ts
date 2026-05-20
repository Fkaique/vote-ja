import { ref, computed } from 'vue'
import { candidatos, cargos } from '@/data/candidatos'
import { Keyboard } from '@/script/keyboard'
import type { Voto } from '@/types/Candidate'

export function useUrna() {
  const keyboard = new Keyboard()

  const etapaAtual  = ref(0)
  const digitado    = ref('')
  const votos       = ref<Voto[]>([])
  const votoBranco  = ref(false)
  const finalizado  = ref(false)

  // ─── Computeds ───────────────────────────────────────

  const cargoAtual = computed(() => cargos[etapaAtual.value])

  const candidatoAtual = computed(() => {
    if (votoBranco.value) return null
    if (digitado.value.length < cargoAtual.value.digitos) return null
    return (
      candidatos.find(
        c => c.numero === digitado.value && c.cargo === cargoAtual.value.nome
      ) ?? null
    )
  })

  const tipoVoto = computed(() => {
    if (votoBranco.value) return 'branco'
    if (digitado.value.length < cargoAtual.value.digitos) return null
    return candidatoAtual.value ? 'nominal' : 'nulo'
  })

  const digitosRestantes = computed(() =>
    cargoAtual.value.digitos - digitado.value.length
  )

  const prontoParaConfirmar = computed(() =>
    votoBranco.value || digitado.value.length === cargoAtual.value.digitos
  )

  // ─── Ações ───────────────────────────────────────────

  function digitarNumero(n: number) {
    if (votoBranco.value) return
    if (digitado.value.length >= cargoAtual.value.digitos) return
    digitado.value += String(n)
  }

  function corrigir() {
    digitado.value   = ''
    votoBranco.value = false
  }

  function marcarBranco() {
    digitado.value   = ''
    votoBranco.value = true
  }

  function confirmar() {
    if (!prontoParaConfirmar.value) return

    votos.value.push({
      cargo:     cargoAtual.value.nome,
      tipo:      tipoVoto.value!,
      candidato: candidatoAtual.value,
    })

    if (etapaAtual.value < cargos.length - 1) {
      etapaAtual.value++
      corrigir()
    } else {
      finalizado.value = true
    }
  }

  function reiniciar() {
    etapaAtual.value  = 0
    digitado.value    = ''
    votos.value       = []
    votoBranco.value  = false
    finalizado.value  = false
  }

  // ─── Teclado físico ──────────────────────────────────

  function iniciarTeclado() {
    keyboard.start()
    window.addEventListener('keydown', handleKeyboard)
  }

  function pararTeclado() {
    keyboard.stop()
    window.removeEventListener('keydown', handleKeyboard)
  }

  function handleKeyboard(e: KeyboardEvent) {
    if (e.key >= '0' && e.key <= '9')  digitarNumero(Number(e.key))
    if (e.key === 'Backspace')          corrigir()
    if (e.key === 'Enter')              confirmar()
    if (e.key === 'b' || e.key === 'B') marcarBranco()
  }

  // ─── Expose ──────────────────────────────────────────

  return {
    // estado
    etapaAtual,
    digitado,
    votos,
    votoBranco,
    finalizado,
    // computeds
    cargoAtual,
    candidatoAtual,
    tipoVoto,
    digitosRestantes,
    prontoParaConfirmar,
    // ações
    digitarNumero,
    corrigir,
    marcarBranco,
    confirmar,
    reiniciar,
    // teclado
    iniciarTeclado,
    pararTeclado,
  }
}