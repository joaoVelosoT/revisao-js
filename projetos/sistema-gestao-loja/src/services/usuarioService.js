import { addProxId, proxId, usuarios } from "../data/usuarios.js";
import { criarResposta } from "../utils/criarResposta.js";
import {
  validarEmail,
  validarNumeroPositivo,
  validarObjeto,
  validarString,
} from "../utils/validacoes.js";

export const listarUsuarios = () => {
  return criarResposta(
    200,
    "Todos os usuários encontrados.",
    structuredClone(usuarios),
  );
};

export const buscarUsuarioPorId = (id) => {
  if (!validarNumeroPositivo(id)) {
    return criarResposta(400, "O ID precisa ser um número maior que zero.");
  }

  const usuario = usuarios.find((usuario) => usuario.id === id);

  if (!usuario) {
    return criarResposta(404, "Usuário não encontrado.");
  }

  return criarResposta(200, "Usuário encontrado.", structuredClone(usuario));
};

export const cadastrarUsuario = (dados) => {
  if (!validarObjeto(dados)) {
    return criarResposta(
      400,
      "Os dados precisam ser enviados para o cadastro do usuário.",
    );
  }

  const { nome, idade, email } = dados;

  if (!validarString(nome)) {
    return criarResposta(
      400,
      "Nome inválido. O nome precisa ser uma string e não pode conter apenas espaços em branco.",
    );
  }

  // Validar se o e-mail é válido.
  if (!validarEmail(email)) {
    return criarResposta(
      400,
      "O e-mail precisa ser uma string e conter o formato @email.com.",
    );
  }

  // Verificar se o e-mail já está cadastrado.
  const existeEmail = usuarios.find(
    (usuario) => usuario.email === email.trim().toLocaleLowerCase(),
  );

  if (existeEmail) {
    return criarResposta(400, "Esse e-mail já está sendo utilizado.");
  }

  if (!validarNumeroPositivo(idade)) {
    return criarResposta(400, "A idade precisa ser um número maior que zero.");
  }

  const usuario = {
    id: proxId,
    nome: nome.trim(),
    idade,
    ativo: true,
    email: email.trim().toLocaleLowerCase(),
  };

  // Função que incrementa a variável proxId em 1.
  addProxId();

  usuarios.push(usuario);

  return criarResposta(
    201,
    "Usuário cadastrado com sucesso.",
    structuredClone(usuario),
  );
};

export const atualizarUsuario = (id, dados) => {
  if (!validarNumeroPositivo(id)) {
    return criarResposta(400, "O ID precisa ser um número maior que zero.");
  }

  // Validar os dados recebidos.
  if (!validarObjeto(dados)) {
    return criarResposta(
      400,
      "Os dados precisam ser enviados para a atualização do usuário.",
    );
  }

  const { nome, idade, email, ativo } = dados;

  if (
    !("nome" in dados) &&
    !("idade" in dados) &&
    !("email" in dados) &&
    !("ativo" in dados)
  ) {
    return criarResposta(
      400,
      "Nenhum dos dados enviados pode ser utilizado para atualizar o usuário.",
    );
  }

  const usuario = usuarios.find((usuario) => usuario.id === id);
  const dadosNovos = {};

  if (!usuario) {
    return criarResposta(404, "Usuário não encontrado.");
  }

  if ("nome" in dados) {
    if (!validarString(nome)) {
      return criarResposta(
        400,
        "Nome inválido. O nome precisa ser uma string e não pode conter apenas espaços em branco.",
      );
    }

    dadosNovos.nome = nome.trim();
  }

  if ("email" in dados) {
    // Validar se o e-mail é válido.
    if (!validarEmail(email)) {
      return criarResposta(
        400,
        "O e-mail precisa ser uma string e conter o formato @email.com.",
      );
    }

    // Verificar se o e-mail já está cadastrado.
    const existeEmail = usuarios.find(
      (usuario) => usuario.email === email.trim().toLocaleLowerCase(),
    );

    if (existeEmail && existeEmail.id !== id) {
      return criarResposta(400, "Esse e-mail já está sendo utilizado.");
    }

    dadosNovos.email = email.trim().toLocaleLowerCase();
  }

  if ("idade" in dados) {
    if (!validarNumeroPositivo(idade)) {
      return criarResposta(
        400,
        "A idade precisa ser um número maior que zero.",
      );
    }

    dadosNovos.idade = idade;
  }

  if ("ativo" in dados) {
    if (typeof ativo !== "boolean") {
      return criarResposta(400, "O campo ativo precisa ser um valor booleano.");
    }

    dadosNovos.ativo = ativo;
  }

  Object.assign(usuario, dadosNovos);

  return criarResposta(
    200,
    "Usuário atualizado com sucesso.",
    structuredClone(usuario),
  );
};

export const deletarUsuario = (id) => {
  if (!validarNumeroPositivo(id)) {
    return criarResposta(400, "O ID precisa ser um número maior que zero.");
  }

  const usuario = usuarios.find((usuario) => usuario.id === id);

  if (!usuario) {
    return criarResposta(404, "Usuário não encontrado.");
  }

  // Excluir o usuário.
  usuarios.splice(usuarios.indexOf(usuario), 1);

  return criarResposta(
    200,
    "Usuário excluído com sucesso.",
    structuredClone(usuario),
  );
};

export const filtrarUsuariosAtivos = () => {
  const usuariosAtivos = usuarios.filter((usuario) => usuario.ativo);

  return criarResposta(
    200,
    "Usuários ativos encontrados.",
    structuredClone(usuariosAtivos),
  );
};

export const gerarRelatorioUsuarios = () => {
  if (usuarios.length === 0) {
    return criarResposta(404, "Nenhum usuário cadastrado");
  }
  const relatorio = usuarios.reduce(
    (acc, usuario) => {
      acc.totalUsuarios += 1;

      if (usuario.ativo) {
        acc.usuariosAtivos += 1;
      } else {
        acc.usuariosInativos += 1;
      }

      acc.mediaIdade += usuario.idade / usuarios.length;

      if (acc.maiorIdade < usuario.idade) {
        acc.maiorIdade = usuario.idade;
      }

      if (acc.menorIdade > usuario.idade || acc.menorIdade === 0) {
        acc.menorIdade = usuario.idade;
      }

      return acc;
    },
    {
      totalUsuarios: 0,
      usuariosAtivos: 0,
      usuariosInativos: 0,
      mediaIdade: 0,
      maiorIdade: 0,
      menorIdade: 0,
    },
  );

  return criarResposta(200, "Relatório gerado com sucesso.", relatorio);
};
