import { pedidos } from "../data/pedidos.js";
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
  const { usuarioId, produtos } = dados;

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
  if (!Array.isArray(produtos)) {
    return criarResposta(400, "Os produtos tem que ta em um array de objetos");
  }

  // validar se no array, tem os dados corretos
  produtos.map((produto) => {
    // validar se tem produtoId e quantidade
    console.log(produto);
    if (("produtoId" in produto) === false) {
      return criarResposta(400, "não tem produtoId");
    }
  });

  console.log(produtos);
  //   console.log(usuario);
};
