import { produtos } from "../data/produtos.js";
import { criarResposta } from "../utils/criarResposta.js";
import {
  validarNumeroPositivo,
  validarObjeto,
  validarString,
} from "../utils/validacoes.js";

export const listarProdutos = () => {
  return criarResposta(
    200,
    "Todos os produtos encontrados.",
    structuredClone(produtos),
  );
};

export const buscarProdutoPorId = (id) => {
  if (!validarNumeroPositivo(id)) {
    return criarResposta(400, "O ID precisa ser um número maior que zero.");
  }

  const produto = produtos.find((produto) => produto.id === id);
  if (!produto) {
    return criarResposta(404, "Produto não encontrado.");
  }

  return criarResposta(200, "Produto encontrado.", structuredClone(produto));
};

export const cadastrarProduto = (dados) => {
  if (!validarObjeto(dados)) {
    return criarResposta(
      400,
      "Os dados precisam ser enviados para o cadastro do produto.",
    );
  }

  const { nome, categoria, preco, quantidadeEstoque } = dados;

  if (!validarString(nome)) {
    return criarResposta(
      400,
      "Nome inválido. O nome precisa ser uma string e não pode conter apenas espaços em branco.",
    );
  }
};
