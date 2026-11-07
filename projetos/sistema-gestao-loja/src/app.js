import {
  cadastrarPedido,
  listarPedidoPorId,
  listarPedidos,
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
  quantidadeEstoque: 112,
});

cadastrarProduto({
  nome: "celular",
  preco: 1111,
  categoria: "eletrônicos",
  quantidadeEstoque: 11,
});

cadastrarProduto({
  nome: "banana",
  preco: 11011.5,
  categoria: "alimentos",
  quantidadeEstoque: 132,
});

atualizarProduto(2, { ativo: false });

// console.log(listarProdutos());

// console.log(deletarProduto(2));
// console.log(listarProdutos());
// cadastrarProduto({
//   nome: "monitor",
//   preco: 10,
//   categoria: "eletrônicos",
//   quantidadeEstoque: 10,
// });
console.log(listarProdutos());

// console.log(filtrarProdutoEmEstoque())4

console.log(gerarRelatorioProdutos());

// console.log(listarPedidoPorId(1));

(cadastrarUsuario({ nome: "João Vitor", email: "joao@email.com", idade: 20 }),
  // atualizarUsuario(1,{ativo : false})
  console.log(
    cadastrarPedido({
      usuarioId: 1,
      produtosPedido: [{ produtoId: 1, quantidade: 1 }, ,],
    }),
  ));
