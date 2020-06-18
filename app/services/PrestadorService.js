import axios from 'axios';

const SISTEMA_URL = '/' + sessionStorage.getItem('sistema');
const PRESTADOR_URL = SISTEMA_URL + '/prestador';

export const savePrestador = async (prestador) => {
  const resposta = {};

  await axios.post(PRESTADOR_URL, prestador)
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

export const deletePrestador = async (id) => {
  const resposta = {};

  await axios.delete(`${PRESTADOR_URL}/${id}`)
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

export const getPrestador = async (id) => {
  const resposta = {};
  await axios.get(`${PRESTADOR_URL}/${id}`)
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

export const updatePrestador = async (prestador) => {
  const resposta = {};

  await axios.put(PRESTADOR_URL, prestador)
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
