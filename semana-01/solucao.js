// 🎯 Desafio da Semana 1 — Normalizador de Pedidos
//
// Missão: transformar a lista de pedidos "crus" num resumo limpo e agrupado
// por cliente (ver README.md da semana para o enunciado completo).
//
// Rode com:  node solucao.js
//
// Escreva sua solução AQUI EMBAIXO. Fique à vontade para criar funções,
// helpers, comentários explicando seu raciocínio.
//
// ---------------------------------------------------------------

const pedidosBrutos = [
  { cliente: "Katia Sam", itens: [{ nome: "Botox 100U", qtd: "2", valor: "189.90" }] },
  { cliente: "Katia Sam", itens: [{ nome: "Preenchedor", qtd: "1", valor: "450" }] },
  { cliente: " katia sam ", itens: [{ nome: "botox 100u", qtd: 1, valor: 189.9 }] },
  { cliente: "Fernanda", itens: [{ nome: "Vitamina C", qtd: "3", valor: "35,50" }] },
  { cliente: "", itens: [{ nome: "Vitamina C", qtd: "1", valor: "35.50" }] },
  { cliente: "KATIA  SAM", itens: [{ nome: "Preenchedor", qtd: 2, valor: "450,00" }] },
];

// ✅ SEU CÓDIGO AQUI
