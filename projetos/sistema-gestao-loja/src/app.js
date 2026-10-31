import { buscarProdutoPorId, cadastrarProduto, listarProdutos } from "./services/produtoService.js";
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
console.log(cadastrarProduto({}))