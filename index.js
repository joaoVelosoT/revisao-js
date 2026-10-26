// função para aplicar desconto, baseado qual tipo de funcionario está logado

const funcionarios = [
    {
        name: "joao",
        tipoFuncionario: "diretor",
        totalDesconto: 10,
    },
    {
        name: "maria",
        tipoFuncionario: "diretor",
        totalDesconto: 10,

    },
    {
        name: "isaLua",
        tipoFuncionario: "auxiliar",
        totalDesconto: 10,

    },
]



const valorfuncionarioDesconto = {
    auxiliar: 5,
    gerente: 10,
    diretor: 15
}

const aplicarDesconto = (valor, nomeFuncionario) => {
    const funcionario = funcionarios.find(funcionario => funcionario.name === nomeFuncionario);
    if (!funcionario) {
        console.log("Funcionario não encontrado")
        return null
    }

    if (valor < 0) {
        console.log("O valor não pode ser negativo");
        return null
    }


    return valor - valor * valorfuncionarioDesconto[funcionario.tipoFuncionario] / 100;

}


const verTotalDesconto = () => {

    const valorTotal = funcionarios.reduce((acumulador, funcionario) => {
        return acumulador + funcionario.totalDesconto;
    }, 0
    )


    return valorTotal;
}


console.log(verTotalDesconto())




// console.log(aplicarDesconto(120, "joao"));
