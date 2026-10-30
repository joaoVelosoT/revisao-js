import {
  atualizarUsuario,
  buscarUsuarioPorId,
  cadastrarUsuario,
  listarUsuarios,
} from "./services/usuarioService.js";

console.log(
  cadastrarUsuario({
    nome: "       a           ",
    idade: 1,
    email: "            a@email.com             ",
  }),
);

cadastrarUsuario({
    nome: "       a           ",
    idade: 1,
    email: "            a2@email.com             ",
  }),

console.log(atualizarUsuario(1, {nome : "maria", idade : 21, email :"a@email.com" }));
