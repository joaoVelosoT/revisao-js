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
  filtrarProdutosEmEstoque,
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

console.log(cadastrarUsuario({ nome: "joao", email: "usuariogmail.com", idade: 21 }));

// console.log(atualizarUsuario(1, {email : " a"}))

// console.log(
//   cadastrarProduto({
//     nome: "      tv",
//     categoria: "eletrônicos",
//     preco: 1110,
//     quantidadeEstoque: 1231,
//   }),
// );

// console.log(
//   cadastrarProduto({
//     nome: "      gel",
//     categoria: "limpezaa",
//     preco: 10,
//     quantidadeEstoque: 1231,
//   }),
// );

// // console.log(cadastrarPedido({usuarioId : 1, produtosPedido : [{produtoId : 1, quantidade : 2},{produtoId : 2, quantidade : 2}]}))

// cancelarPedido(1)

// // console.log(deletarProduto(2))

// // console.log(gerarRelatorioPedidos())
// // console.log(atualizarStatusPedido(1, "cancelado"))
// // console.log(calcularTotalPedido(1))

// // console.log(deletarUsuario(1))
