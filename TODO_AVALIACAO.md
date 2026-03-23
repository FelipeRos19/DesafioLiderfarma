# Prova técnica – Transferência do Dia (versão simplificada)

### O problema do cliente

**Contexto:** O backend identifica produtos problemáticos e persiste no banco; às 22h um processo automático envia ao sistema de transferências entre lojas da rede.

**Necessidade:** Uma página para o usuário:
- visualizar os itens sugeridos para transferência;
- alterar decisões (bloquear envio, ajustar quantidades);
- filtrar a lista por múltiplos critérios.

## Objetivo

Construir uma página **Transferência do Dia** para avaliação de:
- organização de código;
- separação entre página, componentes, hook e service;
- qualidade de UI/UX;
- qualidade de testes;
- capacidade de construir uma tela operacional limpa e portável.

## O que deve ser construído

Uma página que:
- carregue dados via API fake (mock);
- exiba uma **tabela paginada** com navegação por páginas (ver seção Paginação);
- ofereça filtros (mínimos listados na seção correspondente);
- permita edição nas colunas editáveis (quantidade e status da autorização);
- tenha testes unitários cobrindo o que for pedido abaixo.

Neste teste, para simplificação, o salvamento (alterações na tabela por decisão do usuário por exemplo) deve ser no navegador (em memória ou localStorage).

O escopo é delimitado para focar em organização do código e separação de responsabilidades; espera-se uma solução estruturada e testes unitários que cubram os pontos importantes.

## Contexto de produto (para entender o que você vai construir)

**Transferência do Dia** é uma tela para acompanhar o que está sendo sugerido pra transferir entre as lojas da rede no fim do dia.

Fluxo esperado na tela:
- o usuário abre a tela;
- vê a lista de produtos sugeridos pelo backend, indicando de onde sair e para onde ir e quanto transferir;
- identifica o que está **permitido** para transferir (status `PERMITIDO`);
- pode ajustar a quantidade e, se quiser **negar** que aquele item seja transferido no fim do dia, altera o status da autorização para `NAO_PERMITIDO` — nesse caso o item não entra no envio.

**Status da autorização (somente dois para esta prova):**
- **`PERMITIDO`** — o item está autorizado a ser transferido no fim do dia.
- **`NAO_PERMITIDO`** — o usuário negou a transferência desse item (ou já veio assim do backend via regras de negócio).

## Escopo simplificado

### Mínimo funcional

Entregar:
- 1 página principal;
- 1 header;
- 1 painel de filtros;
- 1 tabela com as colunas e comportamentos descritos na seção UI;
- 1 service fake;
- testes unitários (conforme a seção Testes abaixo).

### Filtros mínimos

Implementar pelo menos estes filtros e comportamentos:

- **`descricao`** — Busca textual na descrição do produto. Deve aceitar `%` como curinga (detalhes na seção “Busca textual com curinga”).
- **`loja_origem`** — Filtra pela loja de origem: exibe apenas itens cujo código ou nome da loja de origem **começa com** o valor informado.
- **`loja_destino`** — Filtra pela loja de destino: exibe apenas itens cujo código ou nome da loja de destino **começa com** o valor informado.
- **`problema_alvo`** — Filtra pelo problema em que o produto-loja foi classificado (ex: Ruptura de produtos, Produtos sem giro, Excesso de estoque, etc)

### Ações mínimas

- atualizar lista;
- navegar entre páginas da tabela (primeira, anterior, próxima, última e/ou número da página);
- editar quantidade e status da autorização em uma linha.

## Estrutura sugerida

```txt
src/
  pages/
    unit/
    TransferDayPage.js
  components/
    reports/
      tests/
      ReportHeader.js
    ui/
      tests/
      DataTable.js
      TransferDayFiltersPanel.js
  hooks/
    tests/
    useTransferDayState.js
  services/
    tests/
    futureTransfersService.js
  mocks/
    futureTransfers.fixtures.js
```


### Paginação e navegação

A tabela deve ser **paginada**:
- Exibir apenas uma página de itens por vez (`items_per_page` definido no service, ex.: 10 ou 20).
- Mostrar controles de navegação: permitir ir para primeira página, anterior, próxima, última e/ou escolher o número da página.
- Exibir indicação da página atual e do total de páginas (ex.: "Página 2 de 5" ou "1–20 de 97 itens").
- Ao mudar de página, a lista deve ser atualizada (nova chamada ao service com `page` correspondente); ao aplicar filtros, voltar para a página 1.

### Tabela principal

Grid/tabela com as colunas abaixo.

Colunas obrigatórias:
- `status`
- `produto_id`
- `descricao`
- `loja_origem`
- `loja_destino`
- `quantidade`
- `problema_alvo`
- `motivo_exclusao`


## Contrato de dados e tipos

O service fake deve devolver um objeto com **metadata do snapshot** e **lista de itens**. Cada item da tabela tem os campos abaixo. Os tipos são os mínimos para a prova; o mock pode ter campos a mais desde que os obrigatórios existam.

**Metadata do snapshot (nível da resposta):**
- `snapshotId` — `string` — identificador do snapshot (ex.: `"exec-2026-03-12-01"`).
- `snapshotCreatedAt` — `string` — data/hora do snapshot em ISO 8601 (ex.: `"2026-03-12T03:35:10-03:00"`).

**Campos de cada item (linha da tabela):**

| Campo             | Tipo              | Obrigatório | Descrição |
|-------------------|-------------------|-------------|-----------|
| `id`              | `number`          | sim         | Identificador único da linha. |
| `produto_id`      | `string`          | sim         | Código do produto. |
| `descricao`       | `string`          | sim         | Nome/descrição do produto. |
| `loja_origem`     | `string`          | sim         | Código ou nome da loja de origem da transferência. |
| `loja_destino`    | `string`          | sim         | Código ou nome da loja de destino. |
| `quantidade`      | `number`          | sim         | Quantidade a transferir (≥ 0). |
| `status`          | `"PERMITIDO"` \| `"NAO_PERMITIDO"` | sim | Status da autorização da transferência. |
| `problema_alvo`   | `string` \| `null`| sim         | Diagnóstico do problema na loja destino (ex.: `"RUPTURA"`, `null`). |
| `motivo_exclusao` | `string` \| `null`| sim         | Motivo pelo qual o item foi excluído ou não será transferido, se houver. |

Para os filtros `loja_origem` e `loja_destino`, usar os campos homônimos do item; a comparação é **começa com** (starts with). O header deve exibir `snapshotId` e a data formatada de `snapshotCreatedAt`.

### Exemplo de trecho do mock (fixtures)

Formato esperado da resposta do service fake (trecho):

```js
// Resposta do futureTransfersService.getList() ou equivalente
{
  "snapshotId": "exec-2026-03-12-01",
  "snapshotCreatedAt": "2026-03-12T03:35:10-03:00",
  "pagedData": [
    {
      "id": 1,
      "produto_id": "78901",
      "descricao": "DIPIRONA 500MG",
      "loja_origem": "101",
      "loja_destino": "205",
      "quantidade": 12,
      "status": "PERMITIDO",
      "problema_alvo": "RUPTURA",
      "motivo_exclusao": "Bloqueado pela regra X"
    },
    {
      "id": 2,
      "produto_id": "78902",
      "descricao": "ACETILCISTEINA 20MG/ML FRAMBOESA 120ML",
      "loja_origem": "102",
      "loja_destino": "206",
      "quantidade": 5,
      "status": "PERMITIDO",
      "problema_alvo": "RUPTURA",
      "motivo_exclusao": "Bloqueado pelo usuário"
    },
    {
      "id": 3,
      "produto_id": "78903",
      "descricao": "PARACETAMOL 750MG",
      "loja_origem": "101",
      "loja_destino": "205",
      "quantidade": 0,
      "status": "NAO_PERMITIDO",
      "problema_alvo": "SEM_GIRO",
      "motivo_exclusao": "Bloqueado pelo usuário"
    }
  ],
  "totalItems": 101,
  "totalPages": 1
}
```

### Service fake: contrato e serialização de filtros

O projeto real expõe a listagem paginada assim: a UI envia **um único objeto** com `page` (1-based), `items_per_page` e `filters`; o backend devolve `pagedData`, `totalItems`, `totalPages` e metadados do snapshot. Para esta prova, o **service fake** deve seguir o mesmo contrato, sem backend:

- **Assinatura sugerida:** `getList({ page, items_per_page, filters })`, onde `filters` é um objeto com as chaves `descricao`, `loja_origem`, `loja_destino` (valores string ou vazios).
- **Comportamento:** o service (ou o mock que ele usa) aplica os filtros em memória sobre o dataset de fixtures: `descricao` com `%` como curinga; `loja_origem` e `loja_destino` com **começa com**. Em seguida aplica a paginação (slice pela página atual e `items_per_page`) e retorna `{ snapshotId, snapshotCreatedAt, pagedData, totalItems, totalPages }`.
- **Serialização de filtros:** significa que o chamador (página/hook) monta o objeto de filtros de forma consistente e o service o recebe e usa. Os testes devem cobrir que (1) o service é chamado com o contrato esperado (ex.: `page`, `items_per_page`, `filters` com as chaves corretas) e/ou que (2) a resposta reflete os filtros aplicados (ex.: ao filtrar por `loja_origem` que começa com `"10"`, os itens retornados têm `loja_origem` começando com `"10"`). Evite lógica de filtro espalhada fora do service; centralize no service fake.

### Busca textual com curinga

O filtro `descricao` deve aceitar `%` como curinga.

Exemplo de entrada:

```txt
ACET%INA%20%FRAM%120
```

Deve encontrar algo como:

```txt
ACETILCISTEINA 20MG/ML FRAMBOESA 120ML
```

A implementação da busca pode ser simulada no mock; o importante é o contrato (filtro `descricao` aceita `%`) e um teste que o valide.

## Testes

São obrigatórios apenas **testes unitários**. Cobrir pelo menos:
- serialização de filtros no service;
- busca em `descricao` com `%`;
- render do header exibindo snapshotId e data do snapshot.

Se quiser incluir testes de integração ou E2E, pode; não é exigido para esta prova.

## Critérios de avaliação

**Serão avaliados positivamente:** organização do código; separação clara entre página, componentes, hooks e services; tratamento de estados (loading, vazio, erro); testes unitários cobrindo o pedido; UX coerente com o fluxo descrito; código legível e com estrutura clara.

**Serão avaliados negativamente:** fetch dentro de componentes profundos; página única sem decomposição; mock acoplado diretamente ao JSX; ausência de tratamento de erro ou de testes; ausência de separação entre UI e dados.
