import { GET, POST, PUT } from './RESTClient';

export const novaLiberacao = async (dispatch, cadastros, unidades, tipo, config) => {
  const resposta = await POST(dispatch, '/liberacao', { cadastros, unidades, tipo }, config);
  return resposta;
};

export const testeHome2 = async (dispatch, body, config) => {
  const resposta = await POST(dispatch, '/', body, config);
  return resposta;
};
