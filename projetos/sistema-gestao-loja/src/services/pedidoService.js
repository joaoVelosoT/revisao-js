import { pedidos } from "../data/pedidos.js";
import { produtos } from "../data/produtos.js";
import { usuarios } from "../data/usuarios.js";
import { criarResposta } from "../utils/criarResposta.js";
import { validarNumeroPositivo, validarObjeto } from "../utils/validacoes.js";

export const listarPedidos = () => {
  if (pedidos.length <= 0) {
    return criarResposta(404, "Nenhum pedido foi criado");
  }

  return criarResposta(
    200,
    "Todos os pedidos encontrados",
    structuredClone(pedidos),
  );
};

export const listarPedidoPorId = (id) => {
  // validar se o id e valido

  if (!validarNumeroPositivo(id)) {
    return criarResposta(400, "O ID precisa ser um número maior que zero.");
  }

  const pedido = pedidos.find((element) => element.id === id);

  if (!pedido) {
    return criarResposta(404, "Pedido não encontrado");
  }

  return criarResposta(200, "Pedido encontrado", structuredClone(pedido));
};

export const cadastrarPedido = (dados) => {
  if (!validarObjeto(dados)) {
    return criarResposta(
      400,
      "Os dados precisam ser enviados para o cadastro do pedido.",
    );
  }

  // validar o id do usuario -> procurar o usuario e ver se existe e se esta ativo
  // validar se o pedido tem pelo menos um produto
  // validar se o id do produto -> procurar o pedido e ver se existe e se esta ativo
  // validar se a quantidade do produto e maior que 0, e validar se a quantidade não ultrapasse o estoque do produto
  // validar se os produtos não se repetem
  // o pedido sempre começa pendente
  const { usuarioId, produtosPedido } = dados;

  if (!validarNumeroPositivo(usuarioId)) {
    return criarResposta(400, "O ID precisa ser um número maior que zero.");
  }

  // buscar o usuario e validar se está ativo
  const usuario = usuarios.find((element) => element.id === usuarioId);
  if (!usuario) {
    return criarResposta(404, "Usuario não encontrado");
  }
  if (!usuario.ativo) {
    return criarResposta(400, "O usuario não está ativo");
  }

  // validar se enviaram um array
  if (!Array.isArray(produtosPedido)) {
    return criarResposta(400, "Os produtos tem que ta em um array de objetos");
  }

  //validar se no array, tem os dados corretos
  if (produtosPedido.length <= 0) {
    return criarResposta(400, "O array de produtos está vazio");
  }

  const validarProdutos = produtosPedido.reduce(
    (acc, produto) => {
      //
      console.log(typeof produto !== "object");
      if (typeof produto !== "object") {
        console.log("caiu aaa? ");
        return criarResposta(400, "erro");
        return (acc.arrayInvalido = true);
      }

      // validar se o id e um numero positivo
      if (!validarNumeroPositivo(produto.produtoId)) {
        return (acc.produtosValidos = false);
      }

      // validar se os produtos existem
      const produtoExiste = produtos.find(
        (element) => element.id === produto.produtoId,
      );

      if (!produtoExiste) {
        acc.produtoExiste = false;
      }

      // validar se a quantidade e valida
      if (!validarNumeroPositivo(produto.quantidade)) {
        acc.quantidadeValida = false;
      }

      // validar se a quantidade do produto e maior do que a quantidade pedida
      if (produtoExiste.quantidadeEstoque < produto.quantidade) {
        acc.quantidadeEstoqueValida = false;
      }
      produto.preco = produtoExiste.preco * produto.quantidade;
      //
      acc.valorTotal += produto.preco;

      console.log("passou");
      return acc;
    },
    {
      arrayInvalido: false,
      produtosValidos: true,
      produtoExiste: true,
      quantidadeValida: true,
      quantidadeEstoqueValida: true,
      valorTotal: 0,
    },
  );
  console.log(validarProdutos.arrayInvalido);

  if (validarProdutos.arrayInvalido) {
    return criarResposta(400, "O array de produtos deve contem apenas objetos");
  }

  if (!validarProdutos.produtosValidos) {
    return criarResposta(400, "Id do produto inválido ou inexistente");
  }

  if (!validarProdutos.produtoExiste) {
    return criarResposta(404, "O produto não existe");
  }

  if (!validarProdutos.quantidadeValida) {
    return criarResposta(400, "A quantidade do produto precisa ser positiva");
  }

  // validar se já tem esse produto na lista

  const ids = new Set();

  const existeDuplicado = produtosPedido.some((produto) => {
    if (ids.has(produto.produtoId)) {
      return true;
    }

    ids.add(produto.produtoId);
    return false;
  });

  if (existeDuplicado) {
    return criarResposta(400, "Não e permitido produto duplicado");
  }

  if (!validarProdutos.quantidadeEstoqueValida) {
    return criarResposta(400, "Quantidade pedida e maior que o estoque");
  }

  const dadosPedido = {
    id: undefined,
    usuarioId,
    produtosPedido,
    data: new Date(),
    status: "pendente",
    valorTotal: validarProdutos.valorTotal,
  };

  console.log(dadosPedido);
};
