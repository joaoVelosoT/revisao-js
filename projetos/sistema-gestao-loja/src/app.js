import {
  atualizarProduto,
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

cadastrarProduto({
  nome: "notebook",
  preco: 10,
  categoria: "eletrônicos",
  quantidadeEstoque: 10,
});
cadastrarProduto({
  nome: "celular",
  preco: 10,
  categoria: "eletrônicos",
  quantidadeEstoque: 10,
});
cadastrarProduto({
  nome: "notebook",
  preco: 10,
  categoria: "limpeza",
  quantidadeEstoque: 10,
});
cadastrarProduto({
  nome: "sofá",
  preco: 10,
  categoria: "móveis",
  quantidadeEstoque: 10,
});

console.log(listarProdutos());

console.log(atualizarProduto(1, { nome: "cama", categoria: "móveis"}));
