import { GET } from './RESTClient';

export const abrirPorta = async (id, dispatch, config) => {
  const resposta = await GET(dispatch, `/abrirporta/${id}`, config);
  return resposta.data;
};

export const teste = 0;
