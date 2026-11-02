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
  cadastrarProduto({
    nome: "nome",
    categoria: "eletrônicos",
    preco: 1.1,
    quantidadeEstoque: 1,
  }),
);

console.log(
  cadastrarProduto({
    nome: "notebook",
    categoria: "limpeza",
    preco: 12,
    quantidadeEstoque: 11,
  }),
);

console.log(
  cadastrarProduto({
    nome: "noteebook",
    categoria: "limpeza",
    preco: 12,
    quantidadeEstoque: 11,
  }),
);

console.log("=================================")
console.log(listarProdutos())
console.log("=================================")
