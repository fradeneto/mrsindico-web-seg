import { GET, PUT } from './RESTClient';

export const getTicket = async (dispatch, code) => {
  const resposta = await GET(dispatch, `/ticket/${code}`);
  return resposta;
};

export const liberarTicket = async (dispatch, code) => {
  const resposta = await PUT(dispatch, '/ticket', { code });
  return resposta;
};
