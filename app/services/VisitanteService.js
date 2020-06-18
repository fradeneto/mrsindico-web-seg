import axios from 'axios';

const SISTEMA_URL = '/' + sessionStorage.getItem('sistema');
const VISITANTE_URL = SISTEMA_URL + '/visitante';

export const saveVisitante = async (visitante) => {
  const resposta = {};

  await axios.post(VISITANTE_URL, visitante)
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

export const deleteVisitante = async (id) => {
  const resposta = {};

  await axios.delete(`${VISITANTE_URL}/${id}`)
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
