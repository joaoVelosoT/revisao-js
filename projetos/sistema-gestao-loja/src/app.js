import {
  atualizarUsuario,
  buscarUsuarioPorId,
  cadastrarUsuario,
  deletarUsuario,
  filtrarUsuariosAtivos,
  gerarRelatorioUsuarios,
  listarUsuarios,
} from "./services/usuarioService.js";

// cadastrarUsuario({ nome: "João", email: "joao@email.com", idade: 25 });
// cadastrarUsuario({ nome: "Maria", email: "maria@email.com", idade: 20 });
// cadastrarUsuario({ nome: "Luisa", email: "Luisa@email.com", idade: 22 });
// console.log(cadastrarUsuario({ nome: "Lu", email: "Lu@email.com", idade: 14 }));
// console.log(listarUsuarios());
// console.log(listarUsuarios());

console.log(filtrarUsuariosAtivos())
console.log(gerarRelatorioUsuarios())
