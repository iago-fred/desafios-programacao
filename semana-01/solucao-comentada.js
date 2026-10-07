// 🎯 Desafio da Semana 1 — Resolução COMENTADA (gabarito da Neon)
//
// Este arquivo NÃO substitui a sua solução (`solucao.js`) — é só pra você
// comparar lado a lado e ver os 2 ajustes principais:
//   1) valor total da linha = preço UNITÁRIO × quantidade
//   2) separar "normalizar texto" (comparar) de "converter número"
//
// Rode com: node solucao-comentada.js

const pedidosBrutos = [
  { cliente: "Katia Sam", itens: [{ nome: "Botox 100U", qtd: "2", valor: "189.90" }] },
  { cliente: "Katia Sam", itens: [{ nome: "Preenchedor", qtd: "1", valor: "450" }] },
  { cliente: " katia sam ", itens: [{ nome: "botox 100u", qtd: 1, valor: 189.9 }] },
  { cliente: "Fernanda", itens: [{ nome: "Vitamina C", qtd: "3", valor: "35,50" }] },
  { cliente: "", itens: [{ nome: "Vitamina C", qtd: "1", valor: "35.50" }] },
  { cliente: "KATIA  SAM", itens: [{ nome: "Preenchedor", qtd: 2, valor: "450,00" }] },
];

// ── AJUSTE 1: normalizar TEXTO é uma coisa, CONVERTER número é outra ─────────

// Só serve pra COMPARAR (vira chave do mapa). Nunca devolve número,
// nunca perde o display. Ex.: " katia   SAM " → "katia sam"
function chaveTexto(s) {
  return String(s ?? "").trim().replace(/\s+/g, " ").toLowerCase();
}

// Só serve pra EXIBIR bonito. Ex.: "katia sam" → "Katia Sam"
function titulo(s) {
  return String(s)
    .trim()
    .replace(/\s+/g, " ")
    .split(" ")
    .map((p) => (p ? p[0].toUpperCase() + p.slice(1).toLowerCase() : p))
    .join(" ");
}

// Só serve pra CONVERTER valor em número. Entende "189.90" e "35,50".
// Sempre devolve número (0 se não der).
function paraNumero(v) {
  if (typeof v === "number") return Number.isFinite(v) ? v : 0;
  const s = String(v).trim();
  if (!s) return 0;
  // "1.234,56" → tira pontos, troca vírgula por ponto → "1234.56"
  const normalizado = s.includes(",") ? s.replace(/\./g, "").replace(",", ".") : s;
  const n = Number(normalizado);
  return Number.isFinite(n) ? n : 0;
}

// ── Agrupamento (sua ideia do objeto-mapa, que está certa!) ──────────────────

const mapa = {}; // chave normalizada -> { nome, itens: { chaveItem: {...} } }

for (const pedido of pedidosBrutos) {
  const chave = chaveTexto(pedido.cliente);
  const temNome = pedido.cliente && pedido.cliente.trim() !== "";
  const nomeExibicao = temNome ? titulo(pedido.cliente) : "(sem nome)";

  if (!mapa[chave]) {
    mapa[chave] = { nome: nomeExibicao, itens: {} };
  }

  for (const item of pedido.itens) {
    const chaveItem = chaveTexto(item.nome);
    const qtd = paraNumero(item.qtd);
    const valorUnit = paraNumero(item.valor); // ← preço de UMA unidade

    if (!mapa[chave].itens[chaveItem]) {
      mapa[chave].itens[chaveItem] = { nome: titulo(item.nome), qtd: 0, valor: 0 };
    }

    // ── AJUSTE 2: o valor da linha é UNITÁRIO × QUANTIDADE ──
    mapa[chave].itens[chaveItem].qtd += qtd;
    mapa[chave].itens[chaveItem].valor += valorUnit * qtd;
  }
}

// ── Saída ────────────────────────────────────────────────────────────────────

const formatarBRL = (n) =>
  "R$ " + n.toFixed(2).replace(".", ",").replace(/\B(?=(\d{3})+(?!\d))/g, ".");

let totalGeral = 0;

for (const dados of Object.values(mapa)) {
  console.log("-".repeat(60));
  console.log(`O cliente ${dados.nome} comprou:`);

  let totalCliente = 0;
  for (const item of Object.values(dados.itens)) {
    totalCliente += item.valor;
    const uni = item.qtd === 1 ? "unidade" : "unidades";
    console.log(`  ${item.qtd} ${uni} de ${item.nome} — ${formatarBRL(item.valor)}`);
  }

  console.log(`Total de compra: ${formatarBRL(totalCliente)}`);
  totalGeral += totalCliente;
}

console.log("-".repeat(60));
console.log(`O valor total considerando todos os produtos comprados foi de ${formatarBRL(totalGeral)}`);
console.log("-".repeat(60));
