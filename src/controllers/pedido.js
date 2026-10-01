const pedidos = require("../../dados/pedidos.json")

function subtotais() {
    pedidos.forEach(p => {
        p.subtotal = p.quantidade * p.preco
    })
}
const criar = (req, res) => {
    const dados = req.body
    dados.id = Number(pedidos[pedidos.length - 1].id) + 1
    pedidos.push(dados)
    res.status(201).json(dados)
}
const listar = (req, res) => {
    subtotais()
    res.json(pedidos)
}
const alterar = (req, res) => {
    const p = pedidos.find(item => Number(item.id) === Number(req.params.id))
    
    Object.assign(p, req.body, { id: p.id })
    subtotais()
    res.json(p)
}
const excluir = (req, res) => {
    const index = pedidos.findIndex(item => Number(item.id) === Number(req.params.id))
    
    const [removido] = pedidos.splice(index, 1)
    res.json(removido)
}

module.exports = {
    criar, listar, alterar, excluir
}