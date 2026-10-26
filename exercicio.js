
const transacoes = [
    { descricao: "Salário", categoria: "renda", valor: 3000 },
    { descricao: "Aluguel", categoria: "moradia", valor: 1200 },
    { descricao: "Mercado", categoria: "alimentacao", valor: 350 },
    { descricao: "Freelance", categoria: "renda", valor: 800 },
    { descricao: "Internet", categoria: "moradia", valor: 100 },
    { descricao: "Restaurante", categoria: "alimentacao", valor: 90 },
];


const calcularTotal = () => {

    const total = transacoes.reduce((acumulador, transacao) => {
        return acumulador + transacao.valor;
    }, 0)

    return total
}

// console.log(calcularTotal());

const buscarPorCategoria = (categoria) => {
    if (!transacoes.find(transacao => transacao.categoria === categoria)) {
        console.log("Não existe a categoria enviada");
        return null
    }
    return transacoes.filter((transacao) => {
        return transacao.categoria === categoria
    })

}

// console.log(buscarPorCategoria("renda"))


const listarDescricoes = () => {
    const descricoes = transacoes.map((element, indice, array) => {
        return element.descricao;
    })

    return descricoes
}


const aumentarValores = () => {
    return transacoes.map((element) => {
        return {
            ...element,
            valor: element.valor * 10 / 100 + element.valor
        }
    })
}

aumentarValores();

// console.log(aumentarValores());


const filtrarTransacoesAcimaDe300 = (array) => {
    return array.filter((element) => {
        return element.valor > 300
    })
}

// console.log(filtrarTransacoesAcimaDe300(transacoes));

const filtrarPorCategoria = (array, categoria) => {
    return array.filter((element) => {
        return element.categoria === categoria
    })
}

// console.log(filtrarPorCategoria(transacoes, "moradia"));

const filtrarPorFaixaDeValor = (transacoes, valorMinimo, valorMaximo) => {

    return transacoes.filter((element) => {
        return element.valor >= valorMinimo && element.valor <= valorMaximo
    })
}

// console.log(filtrarPorFaixaDeValor(transacoes,100,1000));


const calcularTotalPorCategoria = (transacoes, categoria) => {

    return transacoes.reduce((acumulador, element) => {
        if (element.categoria === categoria) {
            console.log(element)
        }

        return acumulador
    }, 0)
}





































const calcularTotalRenda = (transacoes) => {
    return transacoes.reduce((acumulador, element) => {
        if (element.categoria === "renda") {

            return acumulador + element.valor
        }

        return acumuladorI
    }, 0)
}





const contarTransacoesPorCategoria = (transacoes, categoria) => {
    return transacoes.reduce((acumulador, element) => {
        if (element.categoria === categoria) {
            return ++acumulador
        }

        return acumulador
    }, 0)
}

/*

console.log(contarTransacoesPorCategoria(transacoes, "moradia"));
console.log(contarTransacoesPorCategoria(transacoes, "renda"));
console.log(contarTransacoesPorCategoria(transacoes, "lazer"));

// 0
*/


const gerarRelatorio = (transacoes) => {
    return transacoes.reduce((acumulador, element) => {
        // console.log(element.valor)
        acumulador.total += element.valor
        acumulador.quantidade += 1
        if (element.categoria === "renda") {
            acumulador.totalRenda += element.valor
        }

        if (element.valor > 300) {
            acumulador.transacoesAcimaDe300 += 1
        }
        return acumulador
    }, {
        total: 0,
        quantidade: 0,
        totalRenda: 0,
        transacoesAcimaDe300: 0
    })
}

console.log(gerarRelatorio(transacoes))