export let proxId = 1;

export const addProxId = () => {
  return (proxId += 1);
};

export const produtos = [
  {
    id: 1,
    nome: "Notebook",
    categoria: "Eletrônicos",
    preco: 3500,
    quantidadeEstoque: 10,
    ativo: true,
  },
];
