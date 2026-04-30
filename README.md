# VoteJá

![Status: Em Desenvolvimento](https://img.shields.io/badge/Status-Em%20Desenvolvimento-orange)

Simulador de urna eletrônica focado em acessibilidade para as eleições de 2026. Este projeto é um requisito acadêmico para a disciplina de Análise de Sistemas no **IFCE**.

## Objetivo do MVP
Desenvolver um simulador funcional até **18 de junho**, garantindo:
- **Dois ciclos eleitorais:** Presidencial e Municipal.
- **Tutorial dinâmico:** Orientação adaptável ao ciclo escolhido.
- **Interface Realista:** Experiência visual e sonora semelhante à urna eletrônica.
- **Acessibilidade:** Foco em legibilidade e alto contraste para idosos.

## Requisitos Funcionais (Principais)
- **RF01**: O sistema deve permitir a escolha entre Ciclo Municipal e Federal.
- **RF02**: O sistema deve validar o número do candidato conforme o cargo atual.
- **RF03**: O sistema deve emitir feedback sonoro ao finalizar o voto.

## Tecnologias
* **Vite + Vue 3 + TypeScript**
* **pnpm** (Gerenciador de pacotes)
* **Vue Router** (Navegação)
* **UnoCSS** (Estilização e Reset)

## Acessibilidade

Projeto desenvolvido seguindo diretrizes de alto contraste e legibilidade para o público idoso, utilizando a fonte **Open Sans** e paleta de cores de alta distinção.

## Cronograma de Desenvolvimento

### Fase 1: Fundação (Semanas 1-2)
- [x] Setup do projeto (Vite/TS/pnpm).
- [ ] Configuração de rotas e estrutura de pastas.
- [ ] Componente `Urna.vue` com teclado interativo.

### Fase 2: Lógica e Dados (Semanas 3-4)
- [ ] Implementação de entrada de números e busca de candidatos (mock).
- [ ] Validação de votos (Nominal, Nulo, Branco).
- [ ] Fluxo de confirmação e correção.

### Fase 3: Ciclos e Tutorial (Semanas 5-6)
- [ ] Alternância entre Ciclo Presidencial e Municipal.
- [ ] Desenvolvimento do tutorial interativo.
- [ ] Lista de consulta de candidatos.

### Fase 4: Refinamento e Entrega (Semana 7)
- [ ] Polimento de UI/UX (Acessibilidade Mobile-First).
- [ ] Implementação do feedback sonoro.
- [ ] **Deploy final e link público**.

## Como rodar

1. Instale as dependências: `pnpm install`.
2. Inicie o servidor: `pnpm dev`.

#### Acesse o sistema online: https://vote-ja.vercel.app
