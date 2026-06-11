<script setup lang="ts">
import { ref } from 'vue';
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
}

const numeroDigitado = ref('');
const candidatoSelecionado = ref<Candidato | null>(null);
const votoEmBranco = ref(false);

function handleDigit(n: number) {
    if (numeroDigitado.value.length < 5) {
        numeroDigitado.value += n.toString();
    }
}

const imagensCandidatos = import.meta.glob('/src/data/*.{png,jpg,jpeg,svg}', { eager: true });

function getImageUrl(path: string) {
    const cleanPath = path.replace("./", "");
    const caminhoCompleto = `/src/data/${cleanPath}`;
    return (imagensCandidatos[caminhoCompleto] as any)?.default || '';
}

const confirm = () => {
    if (votoEmBranco.value) {
        alert("Voto em Branco Confirmado!");
        return 0;
    }

    if (!numeroDigitado.value) {
        alert("Digite um número ou vote em Branco!");
        return 0;
    }

    let listaCandidatos: Candidato[] = [];
    
    if (candidatosData && Array.isArray((candidatosData as any).candidatos)) {
        listaCandidatos = (candidatosData as any).candidatos;
    } else if (Array.isArray(candidatosData)) {
        listaCandidatos = candidatosData;
    } else if (candidatosData && Array.isArray((candidatosData as any).default?.candidatos)) {
        listaCandidatos = (candidatosData as any).default.candidatos;
    }

    const encontrado = listaCandidatos.find((c: Candidato) => Number(c.numero) === Number(numeroDigitado.value));

    if (encontrado) {
        candidatoSelecionado.value = encontrado;
    } else {
        alert("Número inválido / Voto Nulo!");
        candidatoSelecionado.value = null;
    }

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
            <div class="painel">
                <div class="info-voto">
                    <div class="dados-candidato">
                        <div class="display-numero">
                            <span v-if="votoEmBranco" class="blink">VOTO EM BRANCO</span>
                            <span v-else>{{ numeroDigitado }}</span>
                        </div>

                        <div v-if="candidatoSelecionado" class="detalhes">
                            <p class="cargo">{{ candidatoSelecionado.cargo }}</p>
                            <p class="nome">Nome: {{ candidatoSelecionado.name }}</p>
                            <p class="partido">Partido: {{ candidatoSelecionado.partido }}</p>
                        </div>
                    </div>

                    <div v-if="candidatoSelecionado" class="foto-candidato">
                        <img :src="getImageUrl(candidatoSelecionado.fotoUrl)" :alt="candidatoSelecionado.name" />
                    </div>
                </div>
            </div>

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

.painel {
    flex: 1.3;
    background-color: #1a1a1a;
    padding: 16px;
    border-radius: 4px;
    border-bottom: 3px solid #fff;
    border-right: 3px solid #fff;
    border-top: 3px solid #888;
    border-left: 3px solid #888;
    box-shadow: inset 2px 2px 5px rgba(0,0,0,0.5);
    min-height: 340px;
    display: flex;
}

.info-voto {
    background-color: #fff;
    width: 100%;
    height: 100%;
    padding: 15px;
    display: flex;
    justify-content: space-between;
    box-shadow: inset 3px 3px 6px rgba(0,0,0,0.2);
    font-family: sans-serif;
}

.dados-candidato {
    display: flex;
    flex-direction: column;
    gap: 15px;
    flex: 1;
    color: #000;
}

.display-numero {
    font-size: 2.6rem;
    font-weight: bold;
    height: 55px;
    display: flex;
    align-items: center;
}

.blink {
    animation: blink-animation 1s steps(2, start) infinite;
}
@keyframes blink-animation { to { visibility: hidden; } }

.detalhes {
    font-size: 1rem;
    line-height: 1.5;
}
.detalhes .cargo {
    text-transform: uppercase;
    font-weight: bold;
    font-size: 1.3rem;
    margin-bottom: 8px;
}

.foto-candidato {
    width: 120px; 
    aspect-ratio: 3 / 4; 
    border: 2px solid #000;
    align-self: flex-start; 
}
.foto-candidato img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

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

@media (orientation: landscape) and (max-width: 1024px) {
    .urna-dispositivo {
        max-width: 95%;
        padding: 15px; 
    }

    .blink {
        margin-top: 20px;
    }

    .urna-corpo {
        gap: 15px; 
    }

    .painel {
        min-height: 280px;
        flex: 1.1; 
    }

    .teclado-fundo-preto {
        padding: 15px; 
        max-width: 310px;
    }

    .numeros-grid {
        gap: 8px 12px; 
    }
}

@media (orientation: landscape) and (max-width: 768px) {
    .urna-dispositivo {
        transform: scale(0.85); 
        transform-origin: top center;
        margin-bottom: -50px;
    }
    .blink {
        margin-top: 20px;
    }
}

@media (orientation: landscape) and (max-width: 640px) {
    .urna-dispositivo {
        transform: scale(0.72);
        margin-bottom: -100px;
    }
    .blink {
        margin-top: 20px;
    }
}

@media (orientation: portrait) {
    .urna-dispositivo {
        padding: 20px;
        max-width: 480px;
        margin: 0 auto;
    }
    .blink {
        margin-top: 20px;
    }
    .dados-candidato {
        height: 200px;
    }
    .urna-header {
        display: none;
    }

    .urna-corpo {
        flex-direction: column;
        gap: 25px;
    }
    .painel {
        min-height: 260px;
        flex: none;
    }
    
    .teclado-container {
        max-width: 100%;
        display: flex;
        justify-content: flex-end; 
        box-sizing: border-box;
        padding-right: 10px;
    }

    .teclado-fundo-preto {
        max-width: 340px; 
        width: 100%;
        background-color: transparent; 
        box-shadow: none;
        padding: 0;
        display: grid;
        grid-template-columns: 2.2fr 1fr; 
        gap: 15px;
    }

    .numeros-grid {
        gap: 12px;
        width: 100%;
        max-width: 220px; 
        justify-self: end; 
    }

    .acoes-urna {
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start; 
        gap: 12px;
        height: 100%;
        width: 100%;
    }
    
    .confirmButton {
        flex: 3 !important;
        min-height: 75px !important;
        display: flex;
        align-items: start;
        padding-top: 10px !important;
        max-width: 80px;
    }

    .whiteButton {
        flex: 1 !important;
        min-height: 45px !important;
    }

    .correctButton {
        flex: 1 !important;
        min-height: 45px !important;
    }
}
</style>