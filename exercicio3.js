// // const usuario = {
// //     nome: "João",
// //     idade: 25,
// //     email: "joao@email.com",
// //     endereco: {
// //         cidade: "São Paulo",
// //         estado: "SP"
// //     }
// // };

// const { nome, email: emailUsuario, idade: idadeUsuario } = usuario;

// // console.log(nome, emailUsuario, idadeUsuario);


// const linguagens = ["JavaScript", "Python", "Java", "TypeScript"];


// const [primeira, segunda, ...restantes] = linguagens;

// console.log(primeira);
// console.log(restantes);

// const produto = {
//     nome: "Notebook",
//     preco: 3500,
//     categoria: "eletronicos"
// };


// const produtoAtualizado = {
//     ...produto,
//     preco: 3200
// }

// // console.log(produtoAtualizado);

// const usuarios = [
//     { nome: "Ana", idade: 22 },
//     { nome: "Carlos", idade: 30 }
// ];


// const novosUsuarios = [
//     ...usuarios,
//     { nome: "Maria", idade: 27 }
// ]

// console.log(novosUsuarios);


// const usuario = {
//     nome: "João",
//     idade: 25,
//     email: "joao@email.com"
// };


// const usuarioAtualizado = {
//     ...usuario,
//     idade: 26,
//     email: "joao.novo@email.com"
// }

// console.log(usuarioAtualizado);


const usuario = {
    nome: "João",
    idade: 25,
    endereco: {
        cidade: "São Paulo",
        estado: "SP"
    }
};


const usuarioAtualizado = {
    ...usuario,
    endereco: {
        ...usuario.endereco,
        cidade: "Campinas"
    }
}

console.log(usuarioAtualizado);
