import { GET } from './RESTClient';

export const abrirPorta = async (dispatch, config) => {
  const resposta = await GET(dispatch, '/abrirporta', config);
  return resposta.data;
};
