<script setup lang="ts">
import { ref } from 'vue';
import ButtonNumber from './ButtonNumber.vue';
import ConfirmButton from './ConfirmButton.vue';

import candidatosData from '/src/data/candidatos.json';

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


const listaCandidatos = Array.isArray(candidatosData) 
    ? candidatosData 
    : (candidatosData as any).default || [];

const confirm = () => {
    if (votoEmBranco.value) {
        alert("Voto em Branco Confirmado!");
        return 0;
    }

    let listaCandidatos: Candidato[] = [];
    
    if (Array.isArray(candidatosData)) {
        listaCandidatos = candidatosData;
    } else if (candidatosData && Array.isArray((candidatosData as any).default)) {
        listaCandidatos = (candidatosData as any).default;
    } else if (candidatosData && typeof candidatosData === 'object') {
        const chaveArray = Object.keys(candidatosData).find(key => Array.isArray((candidatosData as any)[key]));
        if (chaveArray) listaCandidatos = (candidatosData as any)[chaveArray];
    }

    const encontrado = listaCandidatos.find((c: Candidato) => c.numero === Number(numeroDigitado.value));

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
    <div class="urna">
        <div class="painel">
            <div class="info-voto">
                <div class="dados-candidato">
                    <div class="display-numero">
                        <span v-if="votoEmBranco">VOTO EM BRANCO</span>
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
        <div class="buttons">
            <div class="teclado">
                <div class="btn1">
                    <ButtonNumber class="btnUrna" :digit="1" v-on:click-digit="handleDigit" />
                </div>
                <div class="btn2">
                    <ButtonNumber class="btnUrna" :digit="2" v-on:click-digit="handleDigit" />
                </div>
                <div class="btn3">
                    <ButtonNumber class="btnUrna" :digit="3" v-on:click-digit="handleDigit" />
                </div>
                <div class="btn4">
                    <ButtonNumber class="btnUrna" :digit="4" v-on:click-digit="handleDigit" />
                </div>
                <div class="btn5">
                    <ButtonNumber class="btnUrna" :digit="5" v-on:click-digit="handleDigit" />
                </div>
                <div class="btn6">
                    <ButtonNumber class="btnUrna" :digit="6" v-on:click-digit="handleDigit" />
                </div>
                <div class="btn7">
                    <ButtonNumber class="btnUrna" :digit="7" v-on:click-digit="handleDigit" />
                </div>
                <div class="btn8">
                    <ButtonNumber class="btnUrna" :digit="8" v-on:click-digit="handleDigit" />
                </div>
                <div class="btn9">
                    <ButtonNumber class="btnUrna" :digit="9" v-on:click-digit="handleDigit" />
                </div>
                <div class="btn0">
                    <ButtonNumber class="btnUrna" :digit="0" v-on:click-digit="handleDigit" />
                </div>
                <div class=""></div>
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
            <div class="teclado">
            </div>
        </div>
    </div>
</template>

<style>
.urna {
    display: flex;
    justify-content: center;
    gap: 40px;
    background-color: var(--color-branco);
    padding: 40px;
    border-radius: 8px;
}

.painel {
    width: 450px;
    height: 350px;
    background-color: var(--color-branco);
    border: 4px solid var(--color-text);
    padding: 20px;
    font-size: 2rem;
    display: flex;
    flex-direction: column;
}

.info-voto {
    display: flex;
    justify-content: space-between;
    height: 100%;
}

.dados-candidato {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: 20px;
    flex: 1;
}

.detalhes {
    font-family: sans-serif;
    font-size: 1.3rem;
    line-height: 1.6;
}
.detalhes .cargo {
    text-transform: uppercase;
    font-weight: bold;
    margin-bottom: 10px;
}

.foto-candidato {
    width: 140px;
    height: 190px;
    border: 2px solid #333;
    background-color: #eee;
}

.foto-candidato img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.teclado {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    justify-self: center;
    width: 100%;
    height: 100%;
    gap: 10px;
}

.buttons {
    background-color: var(--color-text);
    padding: 20px;
    border-radius: 4px;
    width: 500px;
}

.btnUrna {
    padding: 5px;
}

.btn0 {
    grid-column: 2;
}

.display-numero {
    font-size: 4rem;
    font-weight: bold;
    height: 80px;
    display: flex;
    align-items: center;
    padding-left: 10px;
}

.acoes-urna {
    grid-column: span 3;
    display: flex;
    justify-content: space-between;
    gap: 10px;
    margin-top: 15px;
    height: 60px;
}

</style>