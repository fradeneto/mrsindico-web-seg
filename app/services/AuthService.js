import axios from 'axios';

import { registerUser } from '../redux/modules/user';

const SISTEMA = 'seguranca';

const LOGIN_URL = '/login';
const RECOVER_URL = '/forgot-password';
const RESET_URL = '/reset-password';
// const SIGNUP_URL = "/signup";
const GET_ME_URL = '/me';
// const REGISTER_URL = '/register'
// const FORGET_PASSWORD = '/forget'

export const isAuthenticated = () => {
  const sistemas = sessionStorage.getItem('sistemas');

  if (!axios.defaults.headers.common.Authorization) {
    const token = sessionStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common = { Authorization: `bearer ${token}` };
    } else {
      return '';
    }
  }
  // ---------------------------------
  // SISTEMA ATUAL
  // ---------------------------------
  return sistemas.includes(SISTEMA); // <==============================================
  // ---------------------------------
  // SISTEMA ATUAL
  // ---------------------------------
};

export const login = async (dispatch, email, password) => {
  let resposta = '';
  await axios.post(LOGIN_URL, { email, password })
    .then(({ data: { token, user, sistemas } }) => {
      loginUser(dispatch, token, user, sistemas);
      if (sistemas.includes(SISTEMA)) { // <===========================================
        resposta = '';
      } else {
        resposta = 'Você não tem permissão para acessar este sistema.';
      }
    })
    .catch((err) => {
      if (err.response && err.response.data && err.response.data.message) {
        resposta = err.response.data.message;
      } else {
        resposta = 'Ocorreu um erro. Por favor, contate o suporte técnico';
      }
    });

  return resposta;
};

export const logout = async (dispatch) => {
  loginUser(dispatch, '', {}, '');
};

export const isAuthenticatedBy = () => {
  if (!axios.defaults.headers.common.Authorization) {
    const token = sessionStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common = { Authorization: `bearer ${token}` };
    } else {
      return '';
    }
  }
  const auth = sessionStorage.getItem('sistema');
  return auth;
};

export const getMe = async dispatch => {
  await axios.get(GET_ME_URL).then(({ data: { token, user, sistema } }) => {
    loginUser(dispatch, token, user, sistema);
  });
};

const loginUser = async (dispatch, token, user, sistemas) => {
  sessionStorage.setItem('token', token);
  sessionStorage.setItem('userId', user.id);
  sessionStorage.setItem('userAvatar', user.avatar_url);
  sessionStorage.setItem('userNome', user.nome);
  sessionStorage.setItem('userSexo', user.sexo);
  sessionStorage.setItem('userTratamento', user.tratamento);
  sessionStorage.setItem('sistemas', sistemas);
  axios.defaults.headers.common = {
    Authorization: `bearer ${token}`
  };
  dispatch(registerUser(token, user, sistemas));
};

export const recoverPassword = async (dispatch, email, subdomain) => {
  let resposta = '';

  await axios.post(RECOVER_URL, { email, subdomain })
    .then(({ data: message }) => {
      resposta = message.message;
    })
    .catch((err) => {
      if (err.response && err.response.data && err.response.data.message) {
        resposta = err.response.data.message;
      } else {
        resposta = 'Ocorreu um erro. Por favor, contate o suporte técnico';
      }
    });

  return resposta;
};

export const resetPassword = async (password, recover_code) => {
  let resposta = '';

  await axios.put(RESET_URL, { password, recover_code })
    .then(({ data: message }) => {
      resposta = message.message;
    })
    .catch((err) => {
      if (err.response && err.response.data && err.response.data.message) {
        resposta = err.response.data.message;
      } else {
        resposta = 'Ocorreu um erro. Por favor, contate o suporte técnico';
      }
    });

  return resposta;
};


export const storageEmail = async () => 'abc@def.com';
