const usuarios = [];
let proxId = 0;

export const cadastrarUsuario = (dados) => {
  if (!dados || typeof dados !== "object" || Array.isArray(dados)) {
    return criarResposta(400, "Os dados do usuario são invalidos");
  }
  const { nome, idade } = dados;

  if (typeof nome !== "string" || nome.trim() === "") {
    return criarResposta(400, "O nome deve ser um texto não vazio");
  }

  if (!Number.isInteger(idade) || idade <= 0) {
    return criarResposta(
      400,
      "A idade tem que ser um numero inteiro, e não pode ser negativo",
    );
  }

  const user = { id: (proxId += 1), nome: nome.trim(), idade };
  usuarios.push(user);
  return criarResposta(201, "Usuario criado com sucesso", user);
};

export const buscarUsuarioID = (id) => {
  if (!Number.isInteger(id) || id <= 0) {
    return criarResposta(400, "O campo 'id' e obrigatorio, inteiro e positivo");
  }

  const usuario = usuarios.find((usuario) => usuario.id === id);
  if (!usuario) {
    return criarResposta(404, "Usuario não encontrado");
  }

  return criarResposta(200, "Usuario encontrado", { ...usuario });
};

export const listarUsuarios = () => {
  return criarResposta(200, "Usuarios encontrados", [...usuarios]);
};

export const contarUsuarios = () => {
  return criarResposta(200, "Quantidade contabilizada", {
    quantidadeUsuarios: usuarios.length,
  });
};

export const deletarUsuario = (id) => {
  if (!Number.isInteger(id) || id <= 0) {
    return criarResposta(400, "O campo 'id' e obrigatorio, inteiro e positivo");
  }
  const usuario = usuarios.find((usuario) => usuario.id === id);
  if (!usuario) {
    return criarResposta(404, "Usuario não encontrado");
  }

  usuarios.splice(usuarios.indexOf(usuario), 1);

  return criarResposta(200, "Usuario deletado");
};

export const gerarRelatorio = () => {
  const relatorio = usuarios.reduce(
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

  return criarResposta(200, "Relatorio gerado", relatorio);
};

export const criarResposta = (status, mensagem, dados = null) => {
  return {
    status,
    mensagem,
    dados,
  };
};
