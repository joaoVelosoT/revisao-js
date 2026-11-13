import {
  atualizarStatusPedido,
  cadastrarPedido,
  calcularTotalPedido,
  cancelarPedido,
  gerarRelatorioPedidos,
  buscarPedidoPorId,
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

// console.log(listarProdutos());
console.log(
  cadastrarProduto({
    nome: "      celular",
    categoria: "eletrônicos",
    preco: 1200,
    quantidadeEstoque: 1231,
  }),
);

console.log(
  cadastrarProduto({
    nome: "      alcool",
    categoria: "limpeza",
    preco: 10,
    quantidadeEstoque: 1231,
  }),
);

// console.log(deletarProduto(12));

cadastrarUsuario({
  nome: "teste",
  email: "teste@email.com",
  idade: 1,
});

// console.log(atualizarProduto(1, { ativo: false }));

// console.log(
//   cadastrarPedido({
//     usuarioId: 1,
//     produtosPedido: [
//       { produtoId: 1, quantidade: 3 },
//       { produtoId: 2, quantidade: 4 },
      
//     ],
//   }),
// );

console.log(
  cadastrarPedido({
    usuarioId: 1,
    produtosPedido: [
      { produtoId: 1, quantidade: 3 },
      // { produtoId: 2, quantidade: 4 },
      
    ],
  }),
);

// console.log(cancelarPedido(2));

// console.dir(listarPedidos(), { depth: null });

console.log(gerarRelatorioPedidos());
// console.log(listarProdutos());