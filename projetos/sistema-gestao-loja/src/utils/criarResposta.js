export const criarResposta = (code, mensagem, dados = null) => {
  return {
    code,
    mensagem,
    dados,
  };
};
