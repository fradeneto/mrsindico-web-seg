import axios from 'axios';

const SISTEMA_URL = '/' + sessionStorage.getItem('sistema');
const VEICULO_URL = SISTEMA_URL + '/veiculo';

export const getVeiculo = async (id) => axios.get(`${VEICULO_URL}/${id}`);

export const getTable = async (query) => {
  query.typeList = 'table';
  return axios.get(VEICULO_URL, { params: { obj: JSON.stringify(query) } });
};

export const saveVeiculo = async (veiculo) => {
  console.log('Save Veiculo');
  const resposta = {};

  await axios.post(VEICULO_URL, veiculo)
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

export const deleteVeiculo = async (id) => {
  const resposta = {};

  await axios.delete(`${VEICULO_URL}/${id}`)
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
