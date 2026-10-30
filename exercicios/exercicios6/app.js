// // const buscarUsuario = (id) => {
// //   return new Promise((resolve, reject) => {
// //     if (id === 1) {
// //       return resolve({ id: 1, nome: "Ana" });
// //     }

// //     reject("Usuario não encontrado");
// //   });
// // };

// // buscarUsuario(2)
// //   .then((value) => console.log(value))
// //   .catch((error) => console.log(error));

// // const buscarPreco = () => {
// //   return Promise.resolve(200);
// // };

// // buscarPreco()
// //   .then((value) => {
// //     return (value -= (value * 10) / 100);
// //   })
// //   .then((value) => {
// //     return (value += 15);
// //   })
// //   .then((value) => {
// //     console.log(value);
// //   })
// //   .catch((error) => {
// //     console.log(error);
// //   });

// // const buscarProduto = (id) => {
// //   return new Promise((resolve, reject) => {
// //     setTimeout(() => {
// //       if (id === 1) {
// //         return resolve({ id: 1, nome: "Notebook", preco: 3500 });
// //       }
// //       reject("Produto não encontrado");
// //     }, 2000);
// //   });
// // };

// // buscarProduto(12)
// //   .then((value) => console.log(value))
// //   .catch((error) => {
// //     console.log(error);
// //   });

// // const produtos = [
// //   { id: 1, nome: "Notebook", preco: 3500 },
// //   { id: 2, nome: "Mouse", preco: 100 },
// //   { id: 3, nome: "Teclado", preco: 200 },
// //   { id: 4, nome: "Monitor", preco: 1200 },
// // ];

// // const buscarProdutosCaro = () => {
// //   return new Promise((resolve, reject) => {
// //     setTimeout(() => {
// //       const produtosCaro = produtos.filter((element) => {
// //         if (element.preco > 500) {
// //           return element;
// //         }
// //       });
// //       resolve([...produtosCaro]);
// //     }, 1000);
// //   });
// // };

// // buscarProdutosCaro().then((value) => console.log(value)).catch((error) => console.error(error)
// // );

// const buscarUsuario = () => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve({ id: 1, nome: "Ana" });
//     }, 1000);
//   });
// };

// const buscarProdutos = () => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve(["Notebook", "Mouse", "Teclado"]);
//     }, 2000);
//   });
// };

// const buscarPedidos = () => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve(["Pedido 1", "Pedido 2"]);
//     }, 1500);
//   });
// };

// const executar = async () => {
//   const [usuario, produtos, pedidos] = await Promise.allSettled([
//     buscarUsuario(),
//     buscarProdutos(),
//     buscarPedidos()
//   ]);

//   console.log(usuario, produtos, pedidos);
// };

// executar();

const buscarUsuario = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id: 1, nome: "Carlos" });
      console.log("teste 1");
    }, 1000);
  });
};

const buscarProdutos = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(["Notebook", "Mouse", "Teclado"]);
      console.log("teste 2");
    }, 2000);
  });
};

const buscarPedidos = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(["Pedido 1", "Pedido 2"]);
      console.log("teste 3");
    }, 1500);
  });
};

const carregarDashboard = async () => {
  try {
    const [usuario, produtos, pedidos] = await Promise.all([
      buscarUsuario(),
      buscarProdutos(),
      buscarPedidos(),
    ]);

    console.log(usuario, produtos, pedidos);
  } catch (error) {
    console.error(error.message);
  }
};

carregarDashboard();
