import {
  buscarUsuarioID,
  cadastrarUsuario,
  contarUsuarios,
  deletarUsuario,
  gerarRelatorio,
  listarUsuarios,
} from "./usuarios.js";

console.log(cadastrarUsuario())

console.log(deletarUsuario(-1))
console.log(buscarUsuarioID(999))
