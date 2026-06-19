<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import ButtonNumber from './ButtonNumber.vue';
import ConfirmButton from './ConfirmButton.vue';

import candidatosData from '../../data/candidatos.json';
import somConfirma from '/src/assets/confirma-urna.mp3';

// ─────────────────────────────────────────────
// Áudio
// ─────────────────────────────────────────────
function tocarConfirma() {
    const audio = new Audio(somConfirma);
    audio.play().catch(() => { /* navegador pode bloquear sem interação prévia */ });
}

// ─────────────────────────────────────────────
// Tipos
// ─────────────────────────────────────────────
interface Candidato {
    id: number;
    name: string;
    numero: number;
    partido: string;
    fotoUrl: string;
    cargo: string;
    slogan?: string;
    modalidade?: string;
}

interface DefCargo {
    label: string;         // Nome exibido na tela
    digitos: number;       // Quantidade de dígitos esperada
    cargo: string;         // Valor de "cargo" no JSON para filtrar candidatos
    vagaKey?: string;      // Chave única para distinguir vagas (ex: senador1, senador2)
}

// ─────────────────────────────────────────────
// Props
// ─────────────────────────────────────────────
const props = withDefaults(defineProps<{
    modalidade?: 'nacional' | 'municipal' | null;
}>(), {
    modalidade: null,
});

// ─────────────────────────────────────────────
// Sequências de cargos por modalidade
// ─────────────────────────────────────────────
const SEQUENCIA_NACIONAL: DefCargo[] = [
    { label: 'DEPUTADO FEDERAL',  digitos: 4, cargo: 'Deputado Federal'  },
    { label: 'DEPUTADO ESTADUAL', digitos: 5, cargo: 'Deputado Estadual' },
    { label: 'SENADOR (1ª VAGA)',           digitos: 3, cargo: 'Senador', vagaKey: 'senador1' },
    { label: 'SENADOR (2ª VAGA)',           digitos: 3, cargo: 'Senador', vagaKey: 'senador2' },
    { label: 'GOVERNADOR',                  digitos: 2, cargo: 'Governador'        },
    { label: 'PRESIDENTE',                  digitos: 2, cargo: 'Presidente'        },
];

const SEQUENCIA_MUNICIPAL: DefCargo[] = [
    { label: 'VEREADOR', digitos: 5, cargo: 'Vereador' },
    { label: 'PREFEITO', digitos: 2, cargo: 'Prefeito' },
];

// ─────────────────────────────────────────────
// Estado reativo
// ─────────────────────────────────────────────
const etapaIndex        = ref(0);
const numeroDigitado    = ref('');
const candidatoSelecionado = ref<Candidato | null>(null);
const votoEmBranco      = ref(false);
const votosRegistrados  = ref<Record<string, { numero: number | null; candidato: Candidato | null; branco: boolean; nulo: boolean }>>({});
const votacaoEncerrada  = ref(false);

// ─────────────────────────────────────────────
// Sequência ativa conforme modalidade
// ─────────────────────────────────────────────
const sequencia = computed<DefCargo[]>(() => {
    if (props.modalidade === 'municipal') return SEQUENCIA_MUNICIPAL;
    return SEQUENCIA_NACIONAL;
});

const etapaAtual = computed<DefCargo>(() => sequencia.value[etapaIndex.value]);

const digitosEsperados = computed(() => etapaAtual.value?.digitos ?? 2);

// ─────────────────────────────────────────────
// Reset completo ao trocar modalidade
// ─────────────────────────────────────────────
function resetarTudo() {
    etapaIndex.value        = 0;
    numeroDigitado.value    = '';
    candidatoSelecionado.value = null;
    votoEmBranco.value      = false;
    votosRegistrados.value  = {};
    votacaoEncerrada.value  = false;
}

watch(() => props.modalidade, () => {
    resetarTudo();
});


const imagensCandidatos = import.meta.glob('/src/data/*.{png,jpg,jpeg,svg}', { eager: true });

function getImageUrl(path: string) {
    const cleanPath = path.replace('./', '');
    const caminhoCompleto = `/src/data/${cleanPath}`;
    return (imagensCandidatos[caminhoCompleto] as any)?.default || '';
}

// ─────────────────────────────────────────────
// Candidatos
// ─────────────────────────────────────────────
function obterListaCandidatos(): Candidato[] {
    let lista: Candidato[] = [];
    if (candidatosData && Array.isArray((candidatosData as any).candidatos)) {
        lista = (candidatosData as any).candidatos;
    } else if (Array.isArray(candidatosData)) {
        lista = candidatosData;
    } else if (candidatosData && Array.isArray((candidatosData as any).default?.candidatos)) {
        lista = (candidatosData as any).default.candidatos;
    }
    return lista;
}

function candidatosDaEtapa(): Candidato[] {
    const lista = obterListaCandidatos();
    const cargo = etapaAtual.value?.cargo;
    return lista.filter((c) => c.cargo === cargo);
}

function verificarCandidato(numero: string) {
    if (!numero) { candidatoSelecionado.value = null; return; }
    const encontrado = candidatosDaEtapa().find((c) => Number(c.numero) === Number(numero));
    candidatoSelecionado.value = encontrado ?? null;
}

// ─────────────────────────────────────────────
// Lógica especial: Senador 2ª vaga
// ─────────────────────────────────────────────
function senadorDuplicado(): boolean {
    const etapa = etapaAtual.value;
    if (etapa?.vagaKey !== 'senador2') return false;
    const voto1 = votosRegistrados.value['senador1'];
    if (!voto1 || !voto1.candidato || !candidatoSelecionado.value) return false;
    return voto1.candidato.id === candidatoSelecionado.value.id;
}

// ─────────────────────────────────────────────
// Handlers
// ─────────────────────────────────────────────
function handleDigit(n: number) {
    if (votoEmBranco.value || votacaoEncerrada.value) return;
    if (numeroDigitado.value.length < digitosEsperados.value) {
        numeroDigitado.value += n.toString();
        verificarCandidato(numeroDigitado.value);
    }
}

function resetarCampo() {
    numeroDigitado.value = '';
    candidatoSelecionado.value = null;
    votoEmBranco.value = false;
}

function avancarEtapa() {
    if (etapaIndex.value < sequencia.value.length - 1) {
        etapaIndex.value++;
        resetarCampo();
    } else {
        // Última etapa concluída
        votacaoEncerrada.value = true;
        resetarCampo();
    }
}

const confirm = () => {
    if (votacaoEncerrada.value) return 0;

    const etapa = etapaAtual.value;
    const chave = etapa.vagaKey ?? etapa.cargo;

    // Voto em branco
    if (votoEmBranco.value) {
        tocarConfirma();
        votosRegistrados.value[chave] = { numero: null, candidato: null, branco: true, nulo: false };
        alert(`✅ Voto em BRANCO confirmado para ${etapa.label}.`);
        avancarEtapa();
        return 0;
    }

    // Nenhum número digitado
    if (!numeroDigitado.value) {
        alert('⚠️ Digite um número ou pressione BRANCO.');
        return 0;
    }

    // Número incompleto
    if (numeroDigitado.value.length < digitosEsperados.value) {
        alert(`⚠️ O número para ${etapa.label} deve ter ${digitosEsperados.value} dígitos.`);
        return 0;
    }

    // Senador duplicado → anula automaticamente o 2º voto
    if (senadorDuplicado()) {
        tocarConfirma();
        alert(`⚠️ Você já votou neste candidato na 1ª vaga.\nO 2º voto no Senador será ANULADO.`);
        votosRegistrados.value[chave] = { numero: Number(numeroDigitado.value), candidato: null, branco: false, nulo: true };
        avancarEtapa();
        return 0;
    }

    // Voto válido com candidato encontrado
    if (candidatoSelecionado.value) {
        tocarConfirma();
        const c = candidatoSelecionado.value;
        votosRegistrados.value[chave] = { numero: Number(numeroDigitado.value), candidato: c, branco: false, nulo: false };
        alert(`✅ Voto confirmado para ${c.name} — ${c.partido}`);
        avancarEtapa();
        return Number(numeroDigitado.value);
    }

    // Voto nulo (número não encontrado)
    tocarConfirma();
    votosRegistrados.value[chave] = { numero: Number(numeroDigitado.value), candidato: null, branco: false, nulo: true };
    alert(`🚫 Voto NULO confirmado para ${etapa.label}.`);
    avancarEtapa();
    return 0;
};

const correct = () => {
    resetarCampo();
    return 0;
};

const white = () => {
    numeroDigitado.value = '';
    candidatoSelecionado.value = null;
    votoEmBranco.value = true;
    return 0;
};

// ─────────────────────────────────────────────
// Computed para exibição
// ─────────────────────────────────────────────

// Mostra aviso "NÚMERO ERRADO" somente quando já digitou dígitos suficientes
const mostrarNulo = computed(() =>
    !votoEmBranco.value &&
    !candidatoSelecionado.value &&
    numeroDigitado.value.length === digitosEsperados.value
);

// Mostra aviso parcial enquanto digita mas número ainda não completo e não encontrado
const mostrarDigitando = computed(() =>
    !votoEmBranco.value &&
    !candidatoSelecionado.value &&
    numeroDigitado.value.length > 0 &&
    numeroDigitado.value.length < digitosEsperados.value
);

// Progresso: ex "3 / 6"
const progressoLabel = computed(() =>
    `${etapaIndex.value + 1} / ${sequencia.value.length}`
);
</script>

<template>
    <div class="urna-dispositivo">

        <div class="urna-header">
            <div class="justica-eleitoral">
                <span>JUSTIÇA ELEITORAL</span>
            </div>
        </div>

        <div class="urna-corpo">
            <!-- ── TELA ── -->
            <div class="painel">
                <div class="tela-lcd">

                    <!-- Tela de encerramento -->
                    <div v-if="votacaoEncerrada" class="tela-encerramento">
                        <p class="txt-simulacao">TREINAMENTO</p>
                        <h1 class="txt-fim">FIM</h1>
                    </div>

                    <!-- Tela de votação normal -->
                    <template v-else>
                        <div class="conteudo-tela">
                            <div class="dados-voto">
                                <span class="txt-simulacao">TREINAMENTO — {{ progressoLabel }}</span>
                                <span class="titulo-voto">SEU VOTO PARA</span>

                                <h2 class="cargo-atual">{{ etapaAtual?.label }}</h2>

                                <div class="campo-numero">
                                    <span class="label">Número:</span>
                                    <div class="digitos-container">
                                        <span v-if="votoEmBranco" class="txt-branco-pisca blink">VOTO EM BRANCO</span>
                                        <span v-else class="digitos-digitados">{{ numeroDigitado }}</span>
                                    </div>
                                </div>

                                <!-- Candidato encontrado -->
                                <div v-if="candidatoSelecionado" class="detalhes-candidato">
                                    <p><span class="label">Nome:</span> {{ candidatoSelecionado.name }}</p>
                                    <p><span class="label">Partido:</span> {{ candidatoSelecionado.partido }}</p>
                                    <p v-if="candidatoSelecionado.slogan" class="slogan-txt">
                                        <i>"{{ candidatoSelecionado.slogan }}"</i>
                                    </p>
                                    <!-- Aviso senador duplicado -->
                                    <p v-if="senadorDuplicado()" class="voto-nulo-aviso blink">
                                        ⚠️ MESMO CANDIDATO DA 1ª VAGA — SERÁ ANULADO
                                    </p>
                                </div>

                                <!-- Número completo mas não encontrado → NULO -->
                                <div v-else-if="mostrarNulo" class="detalhes-candidato">
                                    <p class="voto-nulo-aviso blink">NÚMERO ERRADO — VOTO NULO</p>
                                </div>

                                <!-- Digitando parcialmente -->
                                <div v-else-if="mostrarDigitando" class="detalhes-candidato">
                                    <p class="txt-digitando">
                                        Digite mais {{ digitosEsperados - numeroDigitado.length }} dígito(s)…
                                    </p>
                                </div>
                            </div>

                            <!-- Foto -->
                            <div class="container-foto-candidato">
                                <div v-if="candidatoSelecionado" class="foto-box">
                                    <img :src="getImageUrl(candidatoSelecionado.fotoUrl)" :alt="candidatoSelecionado.name" />
                                </div>
                            </div>
                        </div>

                        <footer class="instrucoes-rodape">
                            <div class="linha-divisoria"></div>
                            <p>Aperte a tecla:</p>
                            <p class="instrucao-linha">🟩 <span class="bold">VERDE</span> para <span class="bold">CONFIRMAR</span></p>
                            <p class="instrucao-linha">🟧 <span class="bold">LARANJA</span> para <span class="bold">CORRIGIR</span></p>
                        </footer>
                    </template>

                </div>
            </div>

            <!-- ── TECLADO ── -->
            <div class="teclado-container">
                <div class="teclado-fundo-preto">
                    <div class="numeros-grid">
                        <ButtonNumber :digit="1" @click-digit="handleDigit" />
                        <ButtonNumber :digit="2" @click-digit="handleDigit" />
                        <ButtonNumber :digit="3" @click-digit="handleDigit" />
                        <ButtonNumber :digit="4" @click-digit="handleDigit" />
                        <ButtonNumber :digit="5" @click-digit="handleDigit" />
                        <ButtonNumber :digit="6" @click-digit="handleDigit" />
                        <ButtonNumber :digit="7" @click-digit="handleDigit" />
                        <ButtonNumber :digit="8" @click-digit="handleDigit" />
                        <ButtonNumber :digit="9" @click-digit="handleDigit" />
                        <div class="spacer"></div>
                        <ButtonNumber :digit="0" @click-digit="handleDigit" />
                        <div class="spacer"></div>
                    </div>

                    <div class="acoes-urna">
                        <ConfirmButton class="whiteButton"   :color="'#ffffff'" :action="white">Branco</ConfirmButton>
                        <ConfirmButton class="correctButton" :color="'#e83e35'" :action="correct">Corrige</ConfirmButton>
                        <ConfirmButton class="confirmButton" :color="'#00aa4f'" :action="confirm">Confirma</ConfirmButton>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
:root {
  --urna-font-size: clamp(0.85rem, 1.3vw, 1.1rem);
}

.urna-dispositivo {
    background-color: #dcdcdc;
    border: 2px solid #b8b8b8;
    border-radius: 12px;
    box-shadow: inset -4px -4px 10px rgba(0,0,0,0.15), 5px 10px 20px rgba(0,0,0,0.3);
    padding: 25px;
    width: 100%;
    max-width: 1000px;
    margin: 0 auto;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    transform-origin: top center;
}

.urna-header {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 15px;
}
.justica-eleitoral {
    background-color: #eaeaea;
    border: 1px solid #aaa;
    padding: 6px 15px;
    font-family: Arial, sans-serif;
    font-weight: bold;
    font-size: 0.85rem;
    color: #333;
    letter-spacing: 1px;
    border-radius: 3px;
    box-shadow: inset 1px 1px 3px rgba(0,0,0,0.1);
}

.urna-corpo {
    display: flex;
    flex-direction: row;
    gap: 25px;
    align-items: stretch;
}

.painel {
    flex: 1.3;
    background-color: #1a1a1a;
    padding: 14px;
    border-radius: 4px;
    border-bottom: 3px solid #fff;
    border-right: 3px solid #fff;
    border-top: 3px solid #888;
    border-left: 3px solid #888;
    box-shadow: inset 2px 2px 5px rgba(0,0,0,0.5);
    min-height: 360px;
    display: flex;
}

.tela-lcd {
    background-color: #e2ebd5;
    width: 100%;
    height: 100%;
    padding: 16px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-shadow: inset 3px 3px 6px rgba(0,0,0,0.3);
    font-family: sans-serif;
    color: #222;
}

/* ── Tela de encerramento ── */
.tela-encerramento {
    display: flex;
    flex-direction: column;
    gap: 10px;
    flex: 1;
}
.msg-encerramento {
    font-size: 0.9rem;
    color: #333;
}
.txt-fim {
    font-size: 4rem;
    font-weight: bold;
    letter-spacing: 8px;
    text-align: center;
    margin: 10px 0;
    color: #111;
}
.resumo-votos {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 5px;
    font-size: 0.85rem;
}
.resumo-votos li { display: flex; gap: 8px; align-items: center; }
.tag-branco { color: #555; font-style: italic; }
.tag-nulo   { color: #a00; font-weight: bold; }
.tag-valido { color: #007a2f; font-weight: bold; }

/* ── Conteúdo da votação ── */
.conteudo-tela {
    display: flex;
    justify-content: space-between;
    width: 100%;
    flex: 1;
}

.dados-voto {
    display: flex;
    flex-direction: column;
    flex: 1;
}

.txt-simulacao {
    font-size: 0.75rem;
    font-weight: bold;
    color: #555;
    letter-spacing: 0.5px;
    margin-bottom: 4px;
}

.titulo-voto {
    font-size: 0.95rem;
    font-weight: bold;
}

.cargo-atual {
    font-size: 1.4rem;
    margin: 8px 0;
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.campo-numero {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-top: 8px;
    min-height: 44px;
}

.digitos-digitados {
    font-size: 2.2rem;
    font-weight: bold;
    font-family: monospace;
    letter-spacing: 4px;
}

.txt-branco-pisca {
    font-size: 1.3rem;
    font-weight: bold;
}

.detalhes-candidato {
    margin-top: 15px;
    font-size: 0.95rem;
    display: flex;
    flex-direction: column;
    gap: 6px;
}

.detalhes-candidato .label {
    font-size: 0.8rem;
    text-transform: uppercase;
    color: #444;
    font-weight: bold;
}

.slogan-txt {
    margin-top: 4px;
    font-size: 0.85rem;
    opacity: 0.8;
}

.voto-nulo-aviso {
    color: #a00;
    font-weight: bold;
    font-size: 1rem;
    margin-top: 10px;
}

.txt-digitando {
    font-size: 0.85rem;
    color: #555;
    font-style: italic;
    margin-top: 10px;
}

.container-foto-candidato {
    width: 115px;
    display: flex;
    justify-content: flex-end;
}

.foto-box {
    width: 105px;
    height: 140px;
    border: 2px solid #111;
    background-color: rgba(0,0,0,0.03);
}

.foto-box img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: grayscale(100%) contrast(110%);
}

.instrucoes-rodape {
    font-size: 0.72rem;
    color: #333;
    line-height: 1.4;
    margin-top: 10px;
}

.linha-divisoria {
    height: 1.5px;
    background-color: #555;
    width: 100%;
    margin-bottom: 6px;
}

.instrucao-linha { margin-left: 2px; }
.bold { font-weight: bold; }

/* ── Teclado ── */
.teclado-container {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
}

.teclado-fundo-preto {
    background-color: #262626;
    padding: 22px;
    border-radius: 6px;
    box-shadow: inset 2px 2px 5px rgba(0,0,0,0.4), 2px 4px 8px rgba(0,0,0,0.3);
    width: 100%;
    max-width: 360px;
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.numeros-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px 18px;
    justify-items: center;
}

.spacer { width: 100%; }

.acoes-urna {
    display: flex;
    justify-content: space-between;
    gap: 8px;
    width: 100%;
    align-items: flex-end;
}

.acoes-urna > * {
    flex: 1;
    font-size: 0.72rem !important;
    font-weight: bold;
    text-transform: uppercase;
    height: 48px !important;
    padding: 0 2px !important;
    display: flex;
    align-items: center;
    justify-content: center;
}

.confirmButton  { height: 56px !important; }
.whiteButton    { height: 46px !important; }
.correctButton  { height: 46px !important; }

.blink { animation: blink-animation 1s steps(2, start) infinite; }
@keyframes blink-animation { to { visibility: hidden; } }

/* ── Responsividade ── */
@media (orientation: landscape) and (max-width: 1024px) {
    .urna-dispositivo { max-width: 95%; padding: 15px; }
    .urna-corpo { gap: 15px; }
    .painel { min-height: 280px; flex: 1.1; }
    .teclado-fundo-preto { padding: 15px; max-width: 310px; }
    .numeros-grid { gap: 8px 12px; }
}
@media (orientation: landscape) and (max-width: 768px) {
    .urna-dispositivo { transform: scale(0.85); margin-bottom: -50px; }
}
@media (orientation: landscape) and (max-width: 640px) {
    .urna-dispositivo { transform: scale(0.72); margin-bottom: -100px; }
}
@media (orientation: portrait) {
    .urna-dispositivo { padding: 20px; max-width: 480px; margin: 0 auto; }
    .urna-header { display: none; }
    .urna-corpo { flex-direction: column; gap: 25px; }
    .painel { min-height: 260px; flex: none; }
    .teclado-container { max-width: 100%; display: flex; justify-content: flex-end; padding-right: 10px; }
    .teclado-fundo-preto { max-width: 340px; width: 100%; background-color: transparent; box-shadow: none; padding: 0; display: grid; grid-template-columns: 2.2fr 1fr; gap: 15px; }
    .numeros-grid { gap: 12px; width: 100%; max-width: 220px; justify-self: end; }
    .acoes-urna { flex-direction: column; justify-content: flex-start; align-items: flex-start; gap: 12px; height: 100%; width: 100%; }
    .confirmButton { flex: 3 !important; min-height: 75px !important; display: flex; align-items: start; padding-top: 10px !important; max-width: 80px; }
    .whiteButton   { flex: 1 !important; min-height: 45px !important; }
    .correctButton { flex: 1 !important; min-height: 45px !important; }
}
</style>