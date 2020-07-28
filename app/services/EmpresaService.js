import { GET } from './RESTClient';

export const listEmpresas = async (dispatch, config) => {
  const resposta = await GET(dispatch, '/empresa', config);
  return resposta.data;
};

export const testeHome2 = async (dispatch, config) => {
  const resposta = await GET(dispatch, '/', config);
  return resposta;
};
