# 🎯 Desafio da Semana 1 — Normalizador de Pedidos

**Tema:** Lógica + manipulação de arrays/objetos
**Linguagem:** JavaScript (Node — `node solucao.js`, sem framework, sem lib)
**Entrega:** até domingo, 11/10/2026

---

## Missão

Você recebe uma lista de pedidos **"crus"** (como chegam bagunçados do
WhatsApp/vendedores) e tem que transformá-la num **resumo limpo e confiável**.

Os pedidos vêm com problemas do mundo real:

- Nomes de cliente com **espaços extras** e **capitalização inconsistente**
  (`"Katia Sam"`, `" katia sam "`, `"KATIA  SAM"` → é o **mesmo** cliente).
- Quantidades como **string** (`"2"`) ou **número** (`2`).
- Valores em formatos diferentes: `"189.90"`, `"35,50"`, `189.9`.
- Cliente **vazio** ou **sem nome**.
- Itens **repetidos** (mesmo produto em pedidos diferentes, ou nome do produto
  com caixa diferente: `"Botox 100U"` vs `"botox 100u"`).

## Input (cole no seu arquivo)

```js
const pedidosBrutos = [
  { cliente: "Katia Sam", itens: [{ nome: "Botox 100U", qtd: "2", valor: "189.90" }] },
  { cliente: "Katia Sam", itens: [{ nome: "Preenchedor", qtd: "1", valor: "450" }] },
  { cliente: " katia sam ", itens: [{ nome: "botox 100u", qtd: 1, valor: 189.9 }] },
  { cliente: "Fernanda", itens: [{ nome: "Vitamina C", qtd: "3", valor: "35,50" }] },
  { cliente: "", itens: [{ nome: "Vitamina C", qtd: "1", valor: "35.50" }] },
  { cliente: "KATIA  SAM", itens: [{ nome: "Preenchedor", qtd: 2, valor: "450,00" }] },
];
```

## O que a saída deve ter

1. **Agrupamento por cliente** — nomes equivalentes viram **um só** cliente.
   - Normalize (trim + colapsar espaços + caixa consistente). Como você vai
     **exibir** o nome é decisão sua (ex.: "Katia Sam"), mas o **agrupamento**
     tem que juntar as variações.
2. **Cliente sem nome** → agrupar numa chave tipo `(sem nome)`.
3. **Consolidação de itens por cliente** — itens com o mesmo produto (ignorando
   caixa) somam a quantidade.
4. **Total por cliente** = soma dos valores dos itens (normalize o valor para número).
5. **Total geral** = soma de todos os clientes.

## Requisitos (o que conta como pronto)

- [ ] Roda com `node solucao.js` sem erro.
- [ ] Agrupa clientes equivalentes (ver "Katia Sam").
- [ ] Agrupa o cliente sem nome em `(sem nome)`.
- [ ] Consolida itens repetidos somando a quantidade.
- [ ] Converte valores string→número corretamente (lida com `.` e `,`).
- [ ] Imprime um resumo legível (cliente → itens → total do cliente) + total geral.
- [ ] **Escreve o algoritmo você mesmo** (sem lib mágica, sem IA entregando a resposta).

## Restrição pedagógica

Sem framework e sem biblioteca externa. Quer formatar número? Use o que o JS
nativo dá (`Number`, `toFixed`, template string).

## 💡 Dica (só uma)

O coração do problema é **decidir como você vai indexar os clientes enquanto
varre a lista**. Um **objeto servindo de "mapa"** resolve — mas pense *por quê*
antes de sair codando: o que aconteceria se você usasse só um `array` e fosse
"procurando" o cliente a cada iteração?

---

Quando terminar: commit + push e avisa a Neon pra revisão. 🛵
