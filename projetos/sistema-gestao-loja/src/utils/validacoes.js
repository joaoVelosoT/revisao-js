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
  if (!validarString(email)) {
    return false;
  }

  // validação simples de email
  if (!email.includes("@email.com")) {
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
