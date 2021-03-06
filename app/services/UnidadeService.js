import { GET } from './RESTClient';

export const listUnidades = async (dispatch, config) => {
  const resposta = await GET(dispatch, '/unidade', config);
  return resposta.data;
};

export const testeHome2 = async (dispatch, config) => {
  const resposta = await GET(dispatch, '/', config);
  return resposta;
};
