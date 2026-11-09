import { addProxIdPedido, pedidos, proxIdPedido } from "../data/pedidos.js";
import { produtos } from "../data/produtos.js";
import { usuarios } from "../data/usuarios.js";
import { criarResposta } from "../utils/criarResposta.js";
import {
  validarNumeroPositivo,
  validarObjeto,
  validarString,
} from "../utils/validacoes.js";
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
      "O corpo da requisição precisa ser um objeto JSON válido",
    );
  }

  const { usuarioId, produtosPedido } = dados;

  if (!("usuarioId" in dados) || !("produtosPedido" in dados)) {
    return criarResposta(
      400,
      "O corpo da requisição precisa conter os campos usuarioId e produtosPedido",
    );
  }

  if (!validarNumeroPositivo(usuarioId)) {
    return criarResposta(
      400,
      "O usuarioId precisa ser um número maior que zero",
    );
  }

  // buscar o usuario e validar se está ativo
  const usuario = usuarios.find((element) => element.id === usuarioId);
  if (!usuario) {
    return criarResposta(404, "Usuario não encontrado");
  }
  if (!usuario.ativo) {
    return criarResposta(
      400,
      "O usuario precisa estar ativo para realizar pedidos",
    );
  }

  // validar se enviaram um array
  if (!Array.isArray(produtosPedido)) {
    return criarResposta(400, "O campo produtosPedido precisa ser um array");
  }

  //validar se no array, tem os dados corretos
  if (produtosPedido.length <= 0) {
    return criarResposta(
      400,
      "O array produtosPedido precisa conter pelo menos um produto",
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
        acc.dadosValidos = false;
        arrayOriginal.splice(index + 1);
        return acc;
      }

      // validar se o id e um numero positivo
      if (!validarNumeroPositivo(produtoId)) {
        acc.produtosValidos = false;
        arrayOriginal.splice(index + 1);
        return acc;
      }

      // validar se os produtos existem
      const produtoExiste = produtos.find(
        (element) => element.id === produtoId,
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
      if (!validarNumeroPositivo(quantidade)) {
        acc.quantidadeValida = false;
        arrayOriginal.splice(index + 1);
        return acc;
      }

      // validar se a quantidade do produto e maior do que a quantidade pedida
      if (produtoExiste.quantidadeEstoque < quantidade) {
        acc.quantidadeEstoqueValida = false;
        arrayOriginal.splice(index + 1);
        return acc;
      }
      produto.preco = produtoExiste.preco * quantidade;
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
      msg: "O corpo da requisição precisa conter os campos produtoId e quantidade",
      dadosCorretos: {
        produtoId: "Número maior que zero",
        quantidade: "Número maior que zero",
      },
    });
  }

  if (validarProdutos.arrayInvalido) {
    return criarResposta(
      400,
      "O array produtosPedido precisa conter apenas objetos JSON válidos",
    );
  }

  if (!validarProdutos.produtosValidos) {
    return criarResposta(
      400,
      "O produtoId precisa ser um número maior que zero",
    );
  }

  if (!validarProdutos.produtoExiste) {
    return criarResposta(404, "Produto não encontrado");
  }

  if (!validarProdutos.produtoAtivo) {
    return criarResposta(
      400,
      "O produto precisa estar ativo para ser adicionado ao pedido",
    );
  }

  if (!validarProdutos.quantidadeValida) {
    return criarResposta(
      400,
      "A quantidade precisa ser um número maior que zero",
    );
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
    return criarResposta(
      400,
      "O array produtosPedido não pode conter produtos duplicados",
    );
  }

  if (!validarProdutos.quantidadeEstoqueValida) {
    return criarResposta(
      400,
      "A quantidade do produto no estoque é menor do que a quantidade pedida",
    );
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

  return criarResposta(200, "Pedido cadastrado!", structuredClone(dadosPedido));
};

export const atualizarStatusPedido = (id, status) => {
  // validar se o id e valido

  if (!validarNumeroPositivo(id)) {
    return criarResposta(400, "O ID precisa ser um número maior que zero.");
  }

  const pedido = pedidos.find((element) => element.id === id);

  if (!pedido) {
    return criarResposta(404, "Pedido não encontrado");
  }

  // validar se o status e valido
  if (!validarString(status)) {
    return criarResposta(400, "O status precisa ser uma string válida");
  }

  const statusValidos = ["pendente", "concluído", "cancelado"];

  if (!statusValidos.includes(status)) {
    return criarResposta(
      400,
      `O status precisa ser um dos seguintes valores: ${statusValidos.join(
        ", ",
      )}`,
    );
  }

  if (pedido.status === status) {
    return criarResposta(400, `O status do pedido já é ${status}`);
  }

  // testar essa validação depois
  if (pedido.status === "cancelado" || pedido.status === "concluído") {
    return criarResposta(
      400,
      "Não é possível atualizar o status de um pedido cancelado ou concluído",
    );
  }

  pedido.status = status;

  return criarResposta(
    200,
    "Status do pedido atualizado",
    structuredClone(pedido),
  );
};

export const cancelarPedido = (id) => {
  if (!validarNumeroPositivo(id)) {
    return criarResposta(400, "O ID precisa ser um número maior que zero.");
  }

  const pedido = pedidos.find((element) => element.id === id);

  if (!pedido) {
    return criarResposta(404, "Pedido não encontrado");
  }

  if (pedido.status === "cancelado") {
    return criarResposta(400, "O pedido já está cancelado");
  }

  if (pedido.status === "concluído") {
    return criarResposta(400, "Não é possível cancelar um pedido concluído");
  }

  pedido.status = "cancelado";

  // atualizar a quantidade do produto
  pedido.produtosPedido.map((element) => {
    const produto = produtos.find(
      (produto) => produto.id === element.produtoId,
    );
    produto.quantidadeEstoque += element.quantidade;
  });

  return criarResposta(
    200,
    "Pedido cancelado com sucesso",
    structuredClone(pedido),
  );
};

export const listarPedidosPorUsuario = (usuarioId) => {
  if (!validarNumeroPositivo(usuarioId)) {
    return criarResposta(
      400,
      "O usuarioId precisa ser um número maior que zero.",
    );
  }

  const usuario = usuarios.find((element) => element.id === usuarioId);

  if (!usuario) {
    return criarResposta(404, "Usuario não encontrado");
  }

  const pedidosUsuario = pedidos.filter(
    (pedido) => pedido.usuarioId === usuarioId,
  );

  if (pedidosUsuario.length <= 0) {
    return criarResposta(404, "Nenhum pedido encontrado para esse usuário");
  }
  return criarResposta(
    200,
    "Pedidos encontrados",
    structuredClone(pedidosUsuario),
  );
};

export const calcularTotalPedido = (id) => {
  if (!validarNumeroPositivo(id)) {
    return criarResposta(400, "O ID precisa ser um número maior que zero.");
  }

  const pedido = pedidos.find((element) => element.id === id);
  if (!pedido) {
    return criarResposta(404, "Pedido não encontrado");
  }

  const totalPedido = pedido.produtosPedido.reduce((acc, produto) => {
    acc += produto.preco * produto.quantidade;

    return acc;
  }, 0);

  return criarResposta(
    200,
    "Total do pedido calculado",
    structuredClone({ totalPedido }),
  );
};

export const gerarRelatorioPedidos = () => {
  const relatorio = pedidos.reduce(
    (acc, pedido) => {
      acc.totalPedido += 1;
      if (pedido.status === "pendente") {
        acc.pedidosPendentes += 1;
      }

      if (pedido.status === "concluído") {
        acc.pedidosConcluidos += 1;
      }

      if (pedido.status === "cancelado") {
        acc.pedidosCancelados += 1;
      }

      if (pedido.status !== "cancelado") {
        acc.totalValorPedidos += pedido.valorTotal;
      }

      // console.log(acc.totalPedido - acc.pedidosCancelados);
      return acc;
    },
    {
      totalPedido: 0,
      pedidosPendentes: 0,
      pedidosConcluidos: 0,
      pedidosCancelados: 0,
      valorTotalPedidos: 0,
      totalValorPedidos: 0,
      ticketMedio: 0,
    },
  );

  relatorio.ticketMedio =
    relatorio.totalValorPedidos /
    (relatorio.totalPedido - relatorio.pedidosCancelados);    

  return criarResposta(200, "Relatorio gerado", structuredClone(relatorio));
};
