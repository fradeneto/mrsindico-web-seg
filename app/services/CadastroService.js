import axios from 'axios';

const SISTEMA_URL = '/' + sessionStorage.getItem('sistema');
const CADASTRO_URL = SISTEMA_URL + '/cadastro';

export const consultaCPF = async (cpf) => {
  const resposta = await axios.get(`${CADASTRO_URL}/${cpf}/cpf`);
  return resposta.data;
};

export const consultaEmail = async (email) => {
  const resposta = await axios.get(`${CADASTRO_URL}/${email}/email`);
  return resposta.data;
};

export const saveCadastro = async (cadastro) => {
  const resposta = {};
  // console.log(cadastro)

  await axios.post(CADASTRO_URL, cadastro)
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
