import { POST } from './RESTClient';

export const getVeiculos = async (dispatch, query) => {
  const resposta = await POST(dispatch, '/veiculos', query);
  return resposta;
};

export const teste = 1;
