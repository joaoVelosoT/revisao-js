export const validarString = (value) => {
  if (typeof value !== "string" || value.trim() === "") {
    return false;
  }

  return true;
};

export const validarNumeroPositivo = (numero) => {
  if (!Number.isInteger(numero) || numero <= 0) {
    return false;
  }

  return true;
};

export const validarEmail = (email) => {
  const emailsValidos = ["gmail.com", "hotmail.com", "outlook.com"];
  if (!validarString(email)) {
    return false;
  }

  email = email.split("@");

  if (email.length !== 2) {
    return false;
  }

  // validação simples de email
  if (!emailsValidos.includes(email[1])) {
    return false;
  }

  // validar se antes do arroba tem algum espaço vazio
  if (email[0].indexOf(" ") !== -1) {
    return false;
  }

  // validar se antes do arroba tem o min de caracters necessarios
  if (email[0].length < 6 || email[0].length > 30) {
    return false;
  }
  return true;
};

export const validarObjeto = (objeto) => {
  if (
    typeof objeto !== "object" ||
    !objeto ||
    Array.isArray(objeto) ||
    Object.keys(objeto).length === 0
  ) {
    return false;
  }
  return true;
};
