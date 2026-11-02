import { categorias } from "../data/categorias.js";
import { addProxIdProduto, produtos, proxIdProduto } from "../data/produtos.js";
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

// @type {Produto}
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

  // validar categoria
  if (
    "categoria" in dados === false ||
    categoria === null ||
    typeof categoria !== "string"
  ) {
    return criarResposta(400, "A categoria e obrigatoria");
  }

  if (!categorias.includes(categoria.trim().toLowerCase())) {
    return criarResposta(400, {
      mensagem: "Categoria invalida",
      categoriasValidas: structuredClone(categorias),
    });
  }

  // validar preco
  if (typeof preco !== "number" || preco <= 0) {
    return criarResposta(
      400,
      "O preço é um número não pode ser menor ou igual a 0",
    );
  }

  if (!Number.isInteger(quantidadeEstoque) || quantidadeEstoque < 0) {
    return criarResposta(
      400,
      "A quantidade do produto precisa ser positiva e maior que zero",
    );
  }

  // validar se o nome já não está sendo utilizado na categoria enviada
  const existeProduto = produtos.find(
    (produto) =>
      produto.nome === nome.trim().toLowerCase() &&
      produto.categoria === categoria.trim().toLowerCase(),
  );


  if (existeProduto) {
    return criarResposta(
      400,
      "Já existe produto com esse nome nessa categoria",
    );
  }

  const produto = {
    id: proxIdProduto,
    nome: nome.trim().toLowerCase(),
    categoria: categoria.trim().toLowerCase(),
    preco,
    quantidadeEstoque,
    ativo: true,
  };

  addProxIdProduto();

  produtos.push(produto);

  return criarResposta(
    201,
    "Produto criado com sucesso",
    structuredClone(produto),
  );
};
