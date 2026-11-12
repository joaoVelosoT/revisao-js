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
console.log(
  cadastrarProduto({
    nome: "      teste",
    categoria: "limpeza",
    preco: 1,
    quantidadeEstoque: 1,
    
  }),
);

console.log(
  cadastrarProduto({
    nome: "      teste",
    categoria: "eletrônicos",
    preco: 1,
    quantidadeEstoque: 1,
  }),
);

console.log(atualizarProduto(1, {categoria:"eletrônicos"}));
