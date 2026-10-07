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

function normalize (a) {
  if (parseFloat(String(a).replaceAll(",", "."))) {
    return parseFloat(String(a).replaceAll(",", "."))
  }
  if (parseInt(a)) {
    return parseInt(a)
  }
  else {
    return a.toUpperCase().replaceAll(" ", "")
  }
}

const objFinal = {}

pedidosBrutos.forEach(pedido => {

  const chave = normalize(pedido.cliente)
  if (!objFinal[chave]) {
    objFinal[chave] = {cliente: pedido.cliente == ""? "(Sem Nome)" : pedido.cliente, itens: {}}
  } 

  pedido.itens.forEach(i => {
    const chaveItem = normalize(i.nome)
    if (!objFinal[chave].itens[chaveItem]) {
      objFinal[chave].itens[chaveItem] = {nome: i.nome, qtd: normalize(i.qtd), valor: normalize(i.valor)}
    }
    else {
      objFinal[chave].itens[chaveItem].qtd += normalize(i.qtd)
      objFinal[chave].itens[chaveItem].valor += normalize(i.valor)
    }

  })

})

let acumulador = 0

Object.entries(objFinal).forEach(cliente => {

  const itens = Object.entries(cliente[1]["itens"])
  const valores = itens.map(item => item[1]["valor"])
  const total = valores.reduce((a, b) => a + b, 0)

  console.log("-".repeat(100))
  console.log(``)
  console.log(`O cliente ${cliente[1].cliente} comprou:`)
  console.log(``)

  itens.forEach(item => {
    
    const uni = item[1]["qtd"] == 1 ? "unidade" : "unidades"
    
    console.log(`${item[1]["qtd"]} ${uni} de ${item[1]["nome"]}, no valor total de ${item[1]["valor"]}`)

    acumulador += item[1]["valor"]
  })
  
  console.log(``)
  console.log(`Total de compra: ${total}`)
  console.log(``)
})

console.log("-".repeat(100))
console.log(``)
console.log(`O valor total considerando todos os produtos comprados foi de ${acumulador}`)
console.log(``)
console.log("-".repeat(100))