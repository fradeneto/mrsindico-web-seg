import { GET } from './RESTClient';

export const listTipos = async (dispatch, config) => {
  const resposta = await GET(dispatch, '/liberacaotipo', config);
  return resposta.data;
};

export const testeHome2 = async (dispatch, config) => {
  const resposta = await GET(dispatch, '/', config);
  return resposta;
};
