import type { Candidate, Cargo } from '@/types/Candidate'

export const cargos: Cargo[] = [
  { nome: 'VEREADOR',   digitos: 5 },
  { nome: 'PREFEITO',   digitos: 2 },
  { nome: 'GOVERNADOR', digitos: 2 },
  { nome: 'PRESIDENTE', digitos: 2 },
]

export const candidatos: Candidate[] = [
  // Vereador
  { numero: '11001', nome: 'Ana Pereira',     partido: 'PSD',  foto: '', cargo: 'VEREADOR' },
  { numero: '20020', nome: 'Carlos Mendes',   partido: 'PT',   foto: '', cargo: 'VEREADOR' },
  { numero: '33333', nome: 'Beatriz Costa',   partido: 'MDB',  foto: '', cargo: 'VEREADOR' },
  // Prefeito
  { numero: '13', nome: 'João Silva',         partido: 'PT',   foto: '', cargo: 'PREFEITO',   vice: 'Maria Souza'    },
  { numero: '45', nome: 'Paula Rocha',        partido: 'PSDB', foto: '', cargo: 'PREFEITO',   vice: 'Roberto Gomes'  },
  { numero: '22', nome: 'Diego Ferreira',     partido: 'MDB',  foto: '', cargo: 'PREFEITO',   vice: 'Luciana Vieira' },
  // Governador
  { numero: '15', nome: 'Fernando Castro',    partido: 'PSD',  foto: '', cargo: 'GOVERNADOR', vice: 'Cláudia Neves'  },
  { numero: '40', nome: 'Mariana Duarte',     partido: 'PSB',  foto: '', cargo: 'GOVERNADOR', vice: 'Paulo Henrique' },
  { numero: '55', nome: 'Alexandre Moraes',   partido: 'REP',  foto: '', cargo: 'GOVERNADOR', vice: 'Sandra Lima'    },
  // Presidente
  { numero: '13', nome: 'Lúcia Mendonça',     partido: 'PT',   foto: '', cargo: 'PRESIDENTE', vice: 'Thiago Barros'  },
  { numero: '22', nome: 'Rafael Correia',     partido: 'PL',   foto: '', cargo: 'PRESIDENTE', vice: 'Ana Cecília'    },
  { numero: '45', nome: 'Samanta Torres',     partido: 'PSDB', foto: '', cargo: 'PRESIDENTE', vice: 'Marcos Vinícius'},
]