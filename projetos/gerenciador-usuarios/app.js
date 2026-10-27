import {
  buscarUsuarioID,
  cadastrarUsuario,
  contarUsuarios,
  deletarUsuario,
  gerarRelatorio,
  listarUsuarios,
} from "./usuarios.js";

console.log("=== CADASTRAR USUÁRIOS ===");

console.log(cadastrarUsuario({ nome: "Ana", idade: 25 }));
console.log(cadastrarUsuario({ nome: "Carlos", idade: 30 }));
console.log(cadastrarUsuario({ nome: "Mariana", idade: 22 }));
console.log(cadastrarUsuario({ nome: "Pedro", idade: 35 }));

console.log("=== LISTAR USUÁRIOS ===");

console.log(listarUsuarios());

console.log("=== BUSCAR USUÁRIO ===");

console.log(buscarUsuarioID(2));
console.log(buscarUsuarioID(99));

console.log("=== DELETAR USUÁRIO ===");

console.log(deletarUsuario(3));
console.log(deletarUsuario(99));


console.log("=== CONTAR USUÁRIOS ===");
console.log(contarUsuarios());

console.log("=== GERAR RELATÓRIO ===");
console.log(gerarRelatorio());