import { GET, POST, PUT } from './RESTClient';

export const getCadastro = async (dispatch, id) => {
  const resposta = await GET(dispatch, `/cadastro/${id}`);
  return resposta.data;
};

export const getCadastroCpf = async (dispatch, cpf) => {
  const resposta = await GET(dispatch, `/cadastro/${cpf}/cpf`);
  return resposta.data;
};

export const getCadastroEmail = async (dispatch, email) => {
  const resposta = await GET(dispatch, `/cadastro/${email}/email`);
  return resposta.data;
};

export const getCadastros = async (dispatch, query) => {
  const resposta = await POST(dispatch, '/cadastros', query);
  return resposta;
};

export const saveCadastro = async (dispatch, cadastro) => {
  const resposta = await POST(dispatch, '/cadastro', cadastro);
  return resposta;
};

export const atualizarCadastro = async (dispatch, cadastro) => {
  const resposta = await PUT(dispatch, '/cadastro', cadastro);
  return resposta;
};
