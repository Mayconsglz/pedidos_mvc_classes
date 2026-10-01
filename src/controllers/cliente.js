const clientes = require("../../dados/clientes.json")

const calcTotais = () => {
    return pedidos.map(pedido => {
        const itensDoPedido = itens.filter(item => Number(item.pedido_id) === Number(pedido.id))
        const total = itensDoPedido.reduce((acc, item) => acc + (item.quantidade * item.preco), 0)
        return {
            ...pedido,
            total
        }
    })
}

const criar = (req, res) => { 
    const dados = req.body
    dados.id = Number(clientes[clientes.length - 1]) + 1
    clientes.push(dados)
    res.status(201).json(dados)
}
const listar = (req, res) => { 
    res.json(clientes)
}
const alterar = (req, res) => {
    const c = clientes.find(item => Number(item.id) === Number(req.params.id))
    
    const { id, nome, cpf } = req.body
    if (id !== undefined) c.id = id
    if (nome !== undefined) c.nome = nome
    if (cpf !== undefined) c.cpf = cpf
    res.json(c)
}
const excluir = (req, res) => {
    const index = clientes.findIndex(item => Number(item.id) === Number(req.params.id))
    
    const [removido] = clientes.splice(index, 1)
    res.json(removido)
}

module.exports = {
    criar, listar, alterar, excluir
}