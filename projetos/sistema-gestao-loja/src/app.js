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

// console.log(listarProdutos());
// console.log(
//   cadastrarProduto({
//     nome: "      teste",
//     categoria: "limpeza",
//     preco: 1,
//     quantidadeEstoque: 1,

//   }),
// );

console.log(
  cadastrarProduto({
    nome: "      Ateste",
    categoria: "eletrônicos",
    preco: 1,
    quantidadeEstoque: 1,
  }),
);

cadastrarProduto({
  nome: "p1",
  categoria: "eletrônicos",
  preco: 1,
  quantidadeEstoque: 1,
});
// console.log(atualizarProduto(1, { nome: "Ateste", categoria: "eletrônicos", preco : 10 })));

// console.log(deletarProduto(12));

console.log(cadastrarUsuario({ nome: "João", email: "joao@email.com",idade : 1 }));
console.log(
  cadastrarPedido({
    usuarioId: 1,
    produtosPedido: [
      {
        produtoId: 1,
        quantidade: 2,
      },
      {
        produtoId: -2,
        quantidade: 2,
      },
    ],
  }),
);
