import axios from 'axios';

const SISTEMA_URL = '/' + sessionStorage.getItem('sistema');
const VEICULO_MARCA_URL = SISTEMA_URL + '/veiculomarca';


export const getMarcas = async () => {
  const resposta = {};
  await axios.get(VEICULO_MARCA_URL, { params: { obj: JSON.stringify({ typeList: 'select' }) } })
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

export const teste = 1;
