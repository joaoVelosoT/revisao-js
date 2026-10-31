import {
  atualizarUsuario,
  buscarUsuarioPorId,
  cadastrarUsuario,
  listarUsuarios,
} from "./services/usuarioService.js";

console.log(
  cadastrarUsuario({
    nome: "       joao          ",
    idade: 1,
    email: "            a@email.com             ",
  }),
);

console.log(
  atualizarUsuario(1, {
    
  }),
);

// console.log(buscarUsuarioPorId(1));
