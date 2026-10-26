const produtos = [
    { nome: "Teclado", preco: 150, categoria: "periferico" },
    { nome: "Mouse", preco: 80, categoria: "periferico" },
    { nome: "Monitor", preco: 900, categoria: "hardware" },
    { nome: "Headset", preco: 250, categoria: "periferico" }
];


const calcularTotalCategoria = (produtos, categoria) => {
    return produtos.reduce((acumulador, element) => {
        if (element.categoria === categoria) {
            return acumulador += element.preco;
        }
        return acumulador
    }, 0)
}

// console.log(calcularTotalCategoria(produtos,"periferico"))


const criarResumoProduto = (produto) => {


    return {
        nome: produto.nome,
        precoComDesconto: produto.preco - produto.preco * 10 / 100,
        categoria: produto.categoria
    }
}

// console.log(criarResumoProduto(produto))

const calcularDesconto = (produto, percentual) => {
    if (produto.preco < 0) {
        return null
    }

    if (percentual < 0 || percentual > 100) {
        return null
    }

    return {
        nome: produto.nome,
        precoComDesconto: produto.preco - produto.preco * percentual / 100,
        categoria: produto.categoria
    }
}

// console.log(calcularDesconto(produto, 12))

const produto = { nome : "teste",preco: 12, categoria: "periferico" }

const validarProduto = (produto) => {
    if (produto.nome && produto.preco >= 0 && produto.categoria) {
        return true
    }
    return false
}

// console.log(validarProduto(produto))

const buscarProduto = (produtos, nome) => {
    const produto = produtos.find((produto => produto.nome === nome));
    if(!produto){
        return null
    }

    return produto
}

console.log(buscarProduto(produtos, "Teclado"))