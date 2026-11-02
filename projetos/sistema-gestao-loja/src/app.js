import {
  buscarProdutoPorId,
  cadastrarProduto,
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

// console.log(listarProdutos())
console.log(
  cadastrarProduto({nome : "teste",categoria : "Eletrônicos", preco : 1, quantidadeEstoque : 1 }),
);

console.log(
  cadastrarProduto({nome : "teste",categoria : "móveis", preco : 1, quantidadeEstoque : 1 }),
);

console.log("=================================")
console.log(listarProdutos())
console.log("=================================")
