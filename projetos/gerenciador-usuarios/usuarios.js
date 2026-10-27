const usuarios = [];
let proxId = 0;

export const cadastrarUsuario = ({ id, nome, idade }) => {
  if (!nome || !idade) {
    return {
      status: 400,
      erro: "Dados Incompletos",
      mensagem:
        "Os campos 'nome,idade' são obrigatórios para realizar o cadastro.",
    };
  }

  usuarios.push({ id: (proxId += 1), nome, idade });
  return {
    status: 200,
    mensagem: "Usuario criado com sucesso",
  };
};

export const buscarUsuarioID = (id) => {
  if (!id) {
    return {
      status: 400,
      erro: "Dados Incompletos",
      mensagem: "O campo 'id' é obrigatório para buscar um usuario.",
    };
  }

  const usuario = usuarios.find((usuario) => usuario.id === id);
  if (!usuario) {
    return {
      status: 400,
      erro: "Usuario não encontrado",
    };
  }

  return {
    dados: { ...usuario },
    status: 200,
    mensagem: "Usuario encontrado",
  };
};

export const listarUsuarios = () => {
  return {
    code: 200,
    mensagem: "Usuarios encontrados",
    dados: [...usuarios],
  };
};

export const contarUsuarios = () => {
  return {
    code: 200,
    quantidadeUsuarios: usuarios.length,
  };
};

export const deletarUsuario = (id) => {
  const usuario = usuarios.find((usuario) => usuario.id === id);
  if (!usuario) {
    return {
      code: 400,
      mensagem: "Não foi encontrado o usuario",
    };
  }

  usuarios.splice(usuarios.indexOf(usuario), 1);

  return {
    code: 200,
    mensagem: "Usuario deletado",
  };
};

export const gerarRelatorio = () => {
  return usuarios.reduce(
    (acc, element) => {
      acc.quantidadeUsuarios += 1;
      acc.nomesUsuarios.push(element.nome);
      acc.mediaIdade += element.idade / usuarios.length;

      return acc;
    },
    {
      quantidadeUsuarios: 0,
      nomesUsuarios: [],
      mediaIdade: 0,
    },
  );
};
