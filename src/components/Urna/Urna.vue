<script setup lang="ts">
import { ref, computed } from 'vue';
import ButtonNumber from './ButtonNumber.vue';
import ConfirmButton from './ConfirmButton.vue';

import candidatosData from '../../data/candidatos.json';

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

const props = withDefaults(defineProps<{
    modalidade?: 'nacional' | 'municipal' | null;
}>(), {
    modalidade: null,
});

const numeroDigitado = ref('');
const candidatoSelecionado = ref<Candidato | null>(null);
const votoEmBranco = ref(false);

// Importação dinâmica das fotos dos candidatos
const imagensCandidatos = import.meta.glob('/src/data/*.{png,jpg,jpeg,svg}', { eager: true });

function getImageUrl(path: string) {
    const cleanPath = path.replace("./", "");
    const caminhoCompleto = `/src/data/${cleanPath}`;
    return (imagensCandidatos[caminhoCompleto] as any)?.default || '';
}

// Extrai a lista de candidatos do arquivo JSON com segurança
function obterListaCandidatos(): Candidato[] {
    let lista: Candidato[] = [];
    if (candidatosData && Array.isArray((candidatosData as any).candidatos)) {
        lista = (candidatosData as any).candidatos;
    } else if (Array.isArray(candidatosData)) {
        lista = candidatosData;
    } else if (candidatosData && Array.isArray((candidatosData as any).default?.candidatos)) {
        lista = (candidatosData as any).default.candidatos;
    }
    if (props.modalidade) {
        return lista.filter((c) => c.modalidade === props.modalidade);
    }
    return lista;
}

// Cargo da urna baseado na modalidade selecionada
const cargoAtual = computed(() => {
    if (candidatoSelecionado.value) return candidatoSelecionado.value.cargo;
    if (props.modalidade === 'municipal') return 'PREFEITO';
    return 'PRESIDENTE';
});

// Verifica e busca o candidato em tempo real a cada dígito inserido
function verificarCandidato(numero: string) {
    if (!numero) {
        candidatoSelecionado.value = null;
        return;
    }
    
    const lista = obterListaCandidatos();
    const encontrado = lista.find((c: Candidato) => Number(c.numero) === Number(numero));
    
    if (encontrado) {
        candidatoSelecionado.value = encontrado;
    } else {
        candidatoSelecionado.value = null;
    }
}

function handleDigit(n: number) {
    if (votoEmBranco.value) return; // Se clicou em branco, bloqueia novos dígitos
    if (numeroDigitado.value.length < 5) {
        numeroDigitado.value += n.toString();
        verificarCandidato(numeroDigitado.value);
    }
}

const confirm = () => {
    if (votoEmBranco.value) {
        alert("Voto em Branco Confirmado!");
        correct();
        return 0;
    }

    if (!numeroDigitado.value) {
        alert("Digite um número ou vote em Branco!");
        return 0;
    }

    if (candidatoSelecionado.value) {
        alert(`Voto confirmado para ${candidatoSelecionado.value.name}!`);
    } else {
        alert("Voto Nulo Confirmado!");
    }

    correct();
    return Number(numeroDigitado.value);
}

const correct = () => {
    numeroDigitado.value = '';
    candidatoSelecionado.value = null;
    votoEmBranco.value = false;
    return 0;
}

const white = () => {
    numeroDigitado.value = '';
    candidatoSelecionado.value = null;
    votoEmBranco.value = true;
    return 0;
}
</script>

<template>
    <div class="urna-dispositivo">
        
        <div class="urna-header">
            <div class="justica-eleitoral">
                <span>JUSTIÇA ELEITORAL</span>
            </div>
        </div>

        <div class="urna-corpo">
            <!-- Painel da Tela (Estilo LCD Realista integrado ao seu design antigo) -->
            <div class="painel">
                <div class="tela-lcd">
                    <div class="conteudo-tela">
                        <div class="dados-voto">
                            <span class="txt-simulacao">TREINAMENTO</span>
                            <span class="titulo-voto">SEU VOTO PARA</span>
                            
                            <h2 class="cargo-atual">
                                {{ cargoAtual }}
                            </h2>

                            <div class="campo-numero">
                                <span class="label">Número:</span>
                                <div class="digitos-container">
                                    <span v-if="votoEmBranco" class="txt-branco-pisca blink">VOTO EM BRANCO</span>
                                    <span v-else class="digitos-digitados">{{ numeroDigitado }}</span>
                                </div>
                            </div>

                            <!-- Informações dinâmicas que surgem ao digitar -->
                            <div v-if="candidatoSelecionado" class="detalhes-candidato">
                                <p><span class="label">Nome:</span> {{ candidatoSelecionado.name }}</p>
                                <p><span class="label">Partido:</span> {{ candidatoSelecionado.partido }}</p>
                                <p v-if="candidatoSelecionado.slogan" class="slogan-txt">
                                    <i>"{{ candidatoSelecionado.slogan }}"</i>
                                </p>
                            </div>
                            
                            <!-- Exibição de número não encontrado / Voto Nulo enquanto digita -->
                            <div v-else-if="numeroDigitado && numeroDigitado.length >= 2" class="detalhes-candidato">
                                <p class="voto-nulo-aviso blink">NÚMERO ERRADO — VOTO NULO</p>
                            </div>
                        </div>

                        <!-- Foto renderizada em tempo real -->
                        <div class="container-foto-candidato">
                            <div v-if="candidatoSelecionado" class="foto-box">
                                <img :src="getImageUrl(candidatoSelecionado.fotoUrl)" :alt="candidatoSelecionado.name" />
                            </div>
                        </div>
                    </div>

                    <!-- Instruções fixas da urna oficial na parte inferior da tela -->
                    <footer class="instrucoes-rodape">
                        <div class="linha-divisoria"></div>
                        <p>Aperte a tecla:</p>
                        <p class="instrucao-linha">🟩 <span class="bold">VERDE</span> para <span class="bold">CONFIRMAR</span></p>
                        <p class="instrucao-linha">🟧 <span class="bold">LARANJA</span> para <span class="bold">CORRIGIR</span></p>
                    </footer>
                </div>
            </div>

            <!-- Mantido o seu Teclado Antigo Intacto -->
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
                        <ConfirmButton class="whiteButton" :color="'#ffffff'" :action="white">
                            Branco
                        </ConfirmButton>
                        <ConfirmButton class="correctButton" :color="'#e83e35'" :action="correct">
                            Corrige
                        </ConfirmButton>
                        <ConfirmButton class="confirmButton" :color="'#00aa4f'" :action="confirm">
                            Confirma
                        </ConfirmButton>
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

/* CONTAINER DA TELA */
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

/* TELA ESTILO LCD OFICIAL */
.tela-lcd {
    background-color: #e2ebd5; /* Tom esverdeado clássico da Urna */
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
    font-size: 1.5rem;
    margin: 10px 0;
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
    font-size: 1.1rem;
    margin-top: 10px;
}

/* CONTAINER DA FOTO NA TELA */
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
    filter: grayscale(100%) contrast(110%); /* Efeito P&B pixelado */
}

/* RODAPÉ DA TELA */
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

.instrucao-linha {
    margin-left: 2px;
}

.bold {
    font-weight: bold;
}

/* MANUTENÇÃO DOS SEUS ESTILOS ORIGINAIS DO TECLADO */
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

.spacer {
    width: 100%;
}

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

.confirmButton {
    height: 56px !important;
}

.whiteButton {
    height: 46px !important;
}

.correctButton {
    height: 46px !important;
}

.blink {
    animation: blink-animation 1s steps(2, start) infinite;
}
@keyframes blink-animation { to { visibility: hidden; } }

/* Responsividade original mantida */
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
    /* Estilos portrait originais preservados */
    .urna-dispositivo { padding: 20px; max-width: 480px; margin: 0 auto; }
    .urna-header { display: none; }
    .urna-corpo { flex-direction: column; gap: 25px; }
    .painel { min-height: 260px; flex: none; }
    .teclado-container { max-width: 100%; display: flex; justify-content: flex-end; padding-right: 10px; }
    .teclado-fundo-preto { max-width: 340px; width: 100%; background-color: transparent; box-shadow: none; padding: 0; display: grid; grid-template-columns: 2.2fr 1fr; gap: 15px; }
    .numeros-grid { gap: 12px; width: 100%; max-width: 220px; justify-self: end; }
    .acoes-urna { flex-direction: column; justify-content: flex-start; align-items: flex-start; gap: 12px; height: 100%; width: 100%; }
    .confirmButton { flex: 3 !important; min-height: 75px !important; display: flex; align-items: start; padding-top: 10px !important; max-width: 80px; }
    .whiteButton { flex: 1 !important; min-height: 45px !important; }
    .correctButton { flex: 1 !important; min-height: 45px !important; }
}
</style>