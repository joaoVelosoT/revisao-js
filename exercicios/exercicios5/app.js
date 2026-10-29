// // const buscarProduto = async () => {
// //   return {
// //     id: 1,
// //     nome: "Teclado",
// //   };
// // };

// // buscarProduto().then((value) => {
// //   console.log(value);
// // });

// // const buscarProduto = async () => {
// //   throw new Error("Produto não encontrado");
// // };

// // const executar = async () => {
// //   try {
// //     await buscarProduto();
// //   } catch (error) {
// //     console.error(error);
// //   }
// // };

// // executar()

// // const buscarUsuario = async (id) => {
// //   if (id === 1) {
// //     return {
// //       id: 1,
// //       nome: "Ana",
// //     };
// //   } else {
// //     throw new Error("Usuario não encontrado");
// //   }
// // };

// // const executar = async () => {
// //   try {
// //     // adicionei o then so para ver se ia chegar tudo ok
// //     await buscarUsuario(2).then((value) => console.log(value));
// //   } catch (error) {
// //     console.error(error.message);
// //   }
// // };

// // executar();

// // const buscarDados = async () => {
// //   return new Promise((resolve, reject) => {
// //     setTimeout(() => {
// //       resolve("Dados carregados");
// //     }, 2000);
// //   });
// // };

// // const executar = async () => {
// //   const dados = await buscarDados();
// //   console.log(dados);
// // };

// // executar();

// // const getUser = async () => {
// //   return {
// //     nome: "user",
// //   };
// // };

// // const executar = async () => {
// //   const name = await getUser();
// //   console.log(name);
// // };

// // executar();
// // console.log("teste")

// const usuarios = [
//   { id: 1, nome: "Ana" },
//   { id: 2, nome: "Carlos" },
//   { id: 3, nome: "Mariana" },
// ];

// const buscarUsuario = async (id) => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       const usuario = usuarios.find((usuario) => usuario.id === id);

//       if (!usuario) {
//         return reject("Usuario não encontrado");
//       }
//       return resolve(usuario);
//     }, 1000);
//   });
// };

// const listarUsuarios = async () => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve([...usuarios]);
//     }, 2000);
//   });
// };
// const executar = async () => {
//   try {
//     const user = await buscarUsuario(1);
//     console.log(user);

//     const users = await listarUsuarios();
//     console.log(users);
//   } catch (error) {
//     console.error(error);
//   }
// };

// executar();

// const multiplicarPorDois = (numero) => {
//   return new Promise((resolve, reject) => {
//     resolve(numero * 2);
//   });
// };

// multiplicarPorDois(5).then((resultado) => {
//   console.log(resultado);
// });

// const dividir = async (a, b) => {
//   return new Promise((resolve, reject) => {
//     if (b === 0) {
//       return reject("Não e possivel dividir por zero");
//     }

//     resolve(a / b);
//   });
// };

// dividir(10, 2)
//   .then((value) => {
//     console.log(value);
//   })
//   .catch((error) => console.error(error));

const comprarProduto = (estoque, quantidade) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (quantidade <= 0) {
        return reject("Quantidade invalida");
      }

      if (quantidade > estoque) {
        return reject("Estoque insuficiente");
      }

      resolve({
        estoqueRestante: estoque - quantidade,
        mensagem: "Compra realizada com sucesso",
      });
    }, 1000);
  });
};

comprarProduto(10, 3)
  .then((resultado) => {
    console.log(resultado);
  })
  .catch((erro) => {
    console.error(erro);
  });

const comprarEExibir = async (estoque, quantidade) => {
  return comprarProduto(estoque, quantidade)
    .then((value) => console.log(value))
    .catch((error) => console.log(error));
};

const test = comprarEExibir(10, 3);
comprarEExibir(5, 8);

log