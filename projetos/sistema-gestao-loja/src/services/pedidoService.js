import { addProxIdPedido, pedidos, proxIdPedido } from "../data/pedidos.js";
import { produtos } from "../data/produtos.js";
import { usuarios } from "../data/usuarios.js";
import { criarResposta } from "../utils/criarResposta.js";
import { validarNumeroPositivo, validarObjeto } from "../utils/validacoes.js";
import { atualizarProduto } from "./produtoService.js";

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

  if (!("usuarioId" in dados) || !("produtosPedido" in dados)) {
    return criarResposta(400, {
      msg: "Dados incorretos",
      dadosCorretos: {
        produtosPedido: { produtoId: "x", quantidade: "x" },
      },
    });
  }

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
    return criarResposta(
      400,
      "os produtos pedidos devem conter pelo menos 1 produto",
    );
  }

  const validarProdutos = produtosPedido.reduce(
    (acc, produto, index, arrayOriginal) => {
      if (typeof produto !== "object") {
        acc.arrayInvalido = true;
        arrayOriginal.splice(index + 1);
        return acc;
      }

      // validar se enviaram os dados corretos

      const { produtoId, quantidade } = produto;

      if (!("produtoId" in produto) || !("quantidade" in produto)) {
        console.log("nao veio o produtoID");
        acc.dadosValidos = false;
        arrayOriginal.splice(index + 1);
        return acc;
      }

      // validar se o id e um numero positivo
      if (!validarNumeroPositivo(produto.produtoId)) {
        acc.produtosValidos = false;
        arrayOriginal.splice(index + 1);
        return acc;
      }

      // validar se os produtos existem
      const produtoExiste = produtos.find(
        (element) => element.id === produto.produtoId,
      );

      if (!produtoExiste) {
        acc.produtoExiste = false;
        arrayOriginal.splice(index + 1);
        return acc;
      }

      if (produtoExiste.ativo !== true) {
        acc.produtoAtivo = false;
        arrayOriginal.splice(index + 1);
        return acc;
      }

      // validar se a quantidade e valida
      if (!validarNumeroPositivo(produto.quantidade)) {
        acc.quantidadeValida = false;
        arrayOriginal.splice(index + 1);
        return acc;
      }

      // validar se a quantidade do produto e maior do que a quantidade pedida
      if (produtoExiste.quantidadeEstoque < produto.quantidade) {
        acc.quantidadeEstoqueValida = false;
        arrayOriginal.splice(index + 1);
        return acc;
      }
      produto.preco = produtoExiste.preco * produto.quantidade;
      //
      acc.valorTotal += produto.preco;

      return acc;
    },
    {
      arrayInvalido: false,
      dadosValidos: true,
      produtosValidos: true,
      produtoExiste: true,
      produtoAtivo: true,
      quantidadeValida: true,
      quantidadeEstoqueValida: true,
      valorTotal: 0,
    },
  );

  if (!validarProdutos.dadosValidos) {
    return criarResposta(400, {
      msg: "Dados incorretos",
      dadosCorretos: {
        produtosPedido: { produtoId: "x", quantidade: "x" },
      },
    });
  }

  if (validarProdutos.arrayInvalido) {
    return criarResposta(400, "O array de produtos deve conter apenas objetos");
  }

  if (!validarProdutos.produtosValidos) {
    return criarResposta(400, "Id do produto inválido ou inexistente");
  }

  if (!validarProdutos.produtoExiste) {
    return criarResposta(404, "O produto não existe");
  }

  if (!validarProdutos.produtoAtivo) {
    return criarResposta(400, "O produto precisa estar ativo");
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
    id: proxIdPedido,
    usuarioId,
    produtosPedido,
    data: new Date(),
    status: "pendente",
    valorTotal: validarProdutos.valorTotal,
  };

  addProxIdPedido();
  pedidos.push(dadosPedido);

  // atualizar a quantidade do produto
  dadosPedido.produtosPedido.map((element) => {
    const produto = produtos.find(
      (produto) => produto.id === element.produtoId,
    );
    produto.quantidadeEstoque -= element.quantidade;
  });

  return criarResposta(200, "Pedido cadastrado !", { dadosPedido });
};
