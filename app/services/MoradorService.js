import axios from 'axios';

const SISTEMA_URL = '/' + sessionStorage.getItem('sistema');
const MORADOR_URL = SISTEMA_URL + '/morador';

export const getTable = async (query) => {
  query.typeList = 'table';
  return axios.get(UNIDADE_URL, { params: { obj: JSON.stringify(query) } });
};

export const saveMorador = async (morador) => {
  const resposta = {};

  await axios.post(MORADOR_URL, morador)
    .then(({ data }) => {
      resposta.data = data;
    })
    .catch((err) => {
      if (err.response && err.response.data) {
        resposta.error = err.response.data;
      } else {
        resposta.error = 'Ocorreu um erro. Por favor, contate o suporte técnico';
      }
    });

  return resposta;
};

export const moradorDelete = async (id) => {
  const resposta = {};

  await axios.delete(`${MORADOR_URL}/${id}`)
    .then(({ data }) => {
      resposta.data = data;
    })
    .catch((err) => {
      if (err.response && err.response.data && err.response.data.message) {
        resposta.error = err.response.data.message;
      } else {
        resposta.error = 'Ocorreu um erro. Por favor, contate o suporte técnico';
      }
    });

  return resposta;
};
