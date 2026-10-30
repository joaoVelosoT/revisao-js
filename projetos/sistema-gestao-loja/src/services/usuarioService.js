import { addProxId, proxId, usuarios } from "../data/usuarios.js";
import { criarResposta } from "../utils/criarResposta.js";
import {
  validarEmail,
  validarNumeroPositivo,
  validarObjeto,
  validarString,
} from "../utils/validacoes.js";

export const listarUsuarios = () => {
  return criarResposta(200, "Todos usuarios encontrados", [...usuarios]);
};

export const buscarUsuarioPorId = (id) => {
  if (!validarNumeroPositivo(id)) {
    return criarResposta(400, "O id precisa ser um numero maior que 0");
  }

  const usuario = usuarios.find((usuario) => usuario.id === id);
  if (!usuario) {
    return criarResposta(404, "Usuario não encontrado");
  }

  return criarResposta(200, "Usuario encontrado", { ...usuario });
};

export const cadastrarUsuario = (dados) => {
  if (!validarObjeto(dados)) {
    return criarResposta(
      400,
      "Os dados precisam ser enviados para o cadastro do usuario",
    );
  }

  const { nome, idade, email } = dados;

  if (!validarString(nome)) {
    return criarResposta(
      400,
      "Nome invalido, o nome precisar ser uma string e não pode ser feito de espaços em branco",
    );
  }

  // validar se o email e valido
  if (!validarEmail(email)) {
    return criarResposta(
      400,
      "O email precisa ser uma string, e ter @email.com ",
    );
  }

  // validar se já não existe esse email cadastrado
  const existeEmail = usuarios.find(
    (usuario) => usuario.email === email.trim().toLocaleLowerCase(),
  );

  if (existeEmail) {
    return criarResposta(400, "Esse email já está sendo utilizado");
  }

  if (!validarNumeroPositivo(idade)) {
    return criarResposta(
      400,
      "A idade precisa ser um numero, e não pode ser menor ou igual de 0",
    );
  }

  const usuario = {
    id: proxId,
    nome: nome.trim(),
    idade,
    ativo: true,
    email: email.trim().toLocaleLowerCase(),
  };

  // função que adiciona +1 na variavel proxId
  addProxId();

  usuarios.push(usuario);
  return criarResposta(201, "Usuario cadastrado", usuario);
};

export const atualizarUsuario = (id, dados) => {
  if (!validarNumeroPositivo(id)) {
    return criarResposta(400, "O id precisa ser um numero maior que 0");
  }

  // validar os dados
  if (!validarObjeto(dados)) {
    return criarResposta(
      400,
      "Os dados precisam ser enviados para a atualização do usuario",
    );
  }

  const { nome, idade, email, ativo } = dados;

  if (nome) {
    if (!validarString(nome)) {
      return criarResposta(
        400,
        "Nome invalido, o nome precisar ser uma string e não pode ser feito de espaços em branco",
      );
    }
  }

  if (email) {
    // validar se o email e valido
    if (!validarEmail(email)) {
      return criarResposta(
        400,
        "O email precisa ser uma string, e ter @email.com ",
      );
    }

    // validar se já não existe esse email cadastrado
    const existeEmail = usuarios.find((usuario) => {
      if (usuario.email === email) {
        if(usuario.id === id){

        }
      }
      if(usuario.email === email){
        return true
      }
    });
    console.log(existeEmail);

    if (existeEmail) {
      return criarResposta(400, "Esse email já está sendo utilizado");
    }
  }

  if (idade) {
    if (!validarNumeroPositivo(idade)) {
      return criarResposta(
        400,
        "A idade precisa ser um numero, e não pode ser menor ou igual de 0",
      );
    }
  }

  if (typeof ativo !== "boolean" && typeof ativo !== "undefined") {
    return criarResposta(400, "O Ativo precisa ser um boolean");
  }

  const usuario = usuarios.find((usuario) => usuario.id === id);

  if (!usuario) {
    return criarResposta(404, "Usuario não encontrado");
  }

  usuario.nome = nome || usuario.nome;
  usuario.email = email || usuario.email;
  usuario.idade = idade || usuario.idade;
  usuario.ativo = ativo || usuario.ativo;

  return criarResposta(200, "Usuario atualizado", { ...usuario });
};
