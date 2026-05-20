// src/types/Candidate.ts

export type Digit = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9

export type TipoVoto = 'nominal' | 'branco' | 'nulo'

export type Candidate = {
  numero: string
  nome: string
  partido: string
  foto: string
  cargo: string
  vice?: string
}

export type Cargo = {
  nome: string
  digitos: number
}

export type Voto = {
  cargo: string
  tipo: TipoVoto
  candidato: Candidate | null
}