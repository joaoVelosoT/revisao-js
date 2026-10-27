const produtos = [
  { id: 1, nome: "Notebook", preco: 3500, categoria: "eletronicos" },
  { id: 2, nome: "Mouse", preco: 150, categoria: "eletronicos" },
  { id: 3, nome: "Cadeira", preco: 800, categoria: "moveis" },
  { id: 4, nome: "Mesa", preco: 1200, categoria: "moveis" },
  { id: 5, nome: "Teclado", preco: 250, categoria: "eletronicos" },
];

// Busca um produto pelo ID.
// Retorna o produto encontrado ou null caso não exista.
const buscarProduto = (produtos, id) => {
  const produto = produtos.find((produto) => produto.id === id);

  if (!produto) {
    console.log("O produto não foi encontrado");
    return null;
  }

  return produto;
};

// Filtra os produtos de acordo com a categoria informada.
// Retorna um novo array contendo apenas os produtos correspondentes.
const filtrarCategoria = (produtos, categoria) => {
  return produtos.filter((element) => {
    if (element.categoria === categoria) {
      return element;
    }
  });
};

// Calcula o valor total do estoque somando os preços de todos os produtos.
// O reduce começa com o acumulador inicializado em 0.
const calcularValorEstoque = (produtos) => {
  return produtos.reduce((acumulador, element) => {
    return (acumulador += element.preco);
  }, 0);
};

// Aplica um desconto ao produto informado.
// Retorna um novo objeto com o preço atualizado, sem modificar o original.
// Retorna null caso o percentual esteja fora do intervalo de 0 a 100.
const aplicarDesconto = (produto, percentual) => {
  if (percentual < 0 || percentual > 100) {
    console.log("A percentual não pode ser negativa, e nem maior que 100");
    return null;
  }

  return {
    ...produto,
    preco: produto.preco - (produto.preco * percentual) / 100,
  };
};

// Exemplo de aplicação de 10% de desconto ao Teclado.
console.log(
  aplicarDesconto(
    {
      id: 5,
      nome: "Teclado",
      preco: 250,
      categoria: "eletronicos",
    },
    10,
  ),
);

// Atualiza os dados de um produto identificado pelo ID.
// Retorna um novo array, preservando o array original.
// O spread combina as propriedades existentes com os novos dados.
const atualizarProduto = (produtos, id, novoProduto) => {
  return produtos.map((content) => {
    if (content.id === id) {
      return {
        ...content,
        ...novoProduto,
      };
    }

    return content;
  });
};

// Gera um relatório com a quantidade de produtos, o valor total do estoque,
// a quantidade de produtos eletrônicos e o nome do produto mais caro.
const gerarRelatorio = (produtos) => {
  // Guarda o maior preço encontrado durante a iteração.
  let produtoMaisCaro = 0;

  // Percorre os produtos e acumula os dados do relatório.
  return produtos.reduce(
    (acumulador, content) => {
      // Conta a quantidade total de produtos.
      acumulador.quantidadeProdutos += 1;

      // Soma o preço do produto ao valor total do estoque.
      acumulador.valorTotalEstoque += content.preco;

      // Conta apenas os produtos da categoria "eletronicos".
      if (content.categoria === "eletronicos") {
        acumulador.quantidadeEletronicos += 1;
      }

      // Atualiza o produto mais caro quando encontra um preço maior.
      if (content.preco > produtoMaisCaro) {
        produtoMaisCaro = content.preco;
        acumulador.produtoMaisCaro = content.nome;
      }

      return acumulador;
    },

    // Valores iniciais utilizados pelo reduce para montar o relatório.
    {
      quantidadeProdutos: 0,
      valorTotalEstoque: 0,
      quantidadeEletronicos: 0,
      produtoMaisCaro: "",
    },
  );
};

// Exibe o relatório final no console.
console.log(gerarRelatorio(produtos));