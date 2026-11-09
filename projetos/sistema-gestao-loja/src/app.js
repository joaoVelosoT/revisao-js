import {
  atualizarStatusPedido,
  cadastrarPedido,
  calcularTotalPedido,
  cancelarPedido,
  gerarRelatorioPedidos,
  listarPedidoPorId,
  listarPedidos,
  listarPedidosPorUsuario,
} from "./services/pedidoService.js";
import {
  atualizarProduto,
  buscarProdutoPorId,
  cadastrarProduto,
  deletarProduto,
  filtrarProdutoEmEstoque,
  gerarRelatorioProdutos,
  listarProdutos,
} from "./services/produtoService.js";
import {
  atualizarUsuario,
  buscarUsuarioPorId,
  cadastrarUsuario,
  deletarUsuario,
  filtrarUsuariosAtivos,
  gerarRelatorioUsuarios,
  listarUsuarios,
} from "./services/usuarioService.js";

cadastrarProduto({
  nome: "ps5",
  preco: 5000,
  categoria: "eletrônicos",
  quantidadeEstoque: 212,
});

cadastrarProduto({
  nome: "celular",
  preco: 1111,
  categoria: "eletrônicos",
  quantidadeEstoque: 221,
});

cadastrarProduto({
  nome: "banana",
  preco: 10,
  categoria: "alimentos",
  quantidadeEstoque: 132,
});

cadastrarUsuario({ nome: "João", email: "joao@email.com", idade: 20 });
// atualizarUsuario(1, { ativo: false });
console.log(
  cadastrarPedido({
    usuarioId: 1,
    produtosPedido: [
      { produtoId: 1, quantidade: 1 },
      { produtoId: 2, quantidade: 1 },
    ],
  }),
);

cadastrarPedido({
    usuarioId: 1,
    produtosPedido: [
      { produtoId: 1, quantidade: 1 },
      { produtoId: 2, quantidade: 1 },
    ],
  }),

  cadastrarPedido({
    usuarioId: 1,
    produtosPedido: [
      { produtoId: 1, quantidade: 1 },
      { produtoId: 2, quantidade: 1 },
    ],
  }),

  cadastrarPedido({
    usuarioId: 1,
    produtosPedido: [
      { produtoId: 1, quantidade: 1 },
      { produtoId: 2, quantidade: 1 },
    ],
  }),

  cadastrarPedido({
    usuarioId: 1,
    produtosPedido: [
      { produtoId: 1, quantidade: 1 },
      { produtoId: 2, quantidade: 1 },
    ],
  }),

  cadastrarPedido({
    usuarioId: 1,
    produtosPedido: [
      { produtoId: 1, quantidade: 1 },
      { produtoId: 2, quantidade: 1 },
    ],
  }),

  cadastrarPedido({
    usuarioId: 1,
    produtosPedido: [
      { produtoId: 1, quantidade: 1 },
      { produtoId: 2, quantidade: 1 },
    ],
  }),

  cadastrarPedido({
    usuarioId: 1,
    produtosPedido: [
      { produtoId: 1, quantidade: 1 },
      { produtoId: 2, quantidade: 1 },
    ],
  }),

  cadastrarPedido({
    usuarioId: 1,
    produtosPedido: [
      { produtoId: 1, quantidade: 1 },
      { produtoId: 2, quantidade: 1 },
    ],
  }),

  cancelarPedido(3)
  cancelarPedido(1)
  atualizarStatusPedido(2,'concluído')
  atualizarStatusPedido(5,'concluído')
  

// console.log(listarProdutos());

// console.log(cancelarPedido(1));
// console.log(atualizarStatusPedido(1, "pendente"));

console.dir(listarPedidosPorUsuario(1), { depth: null });
// console.log(listarProdutos());
// console.log(l  istarPedidos());

console.log(calcularTotalPedido(1));

console.log(gerarRelatorioPedidos());
