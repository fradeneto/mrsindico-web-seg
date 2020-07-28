import axios from 'axios';
import { logout } from './AuthService';

export const GET = async (dispatch, URL = '', config = null) => {
  let obj;
  await axios.get(`/seguranca${URL}`, config)
    .then(data => { obj = data; })
    .catch(err => {
      if (err.response && err.response.data) {
        obj = {
          data: err.response.data,
          status: err.response.status
        };
      } else {
        // 404
        obj = {
          data: {},
          status: 0
        };
      }
    });
  if (obj.status === 401) {
    // await sessionStorage.setItem('sistemas', '');
    logout(dispatch);
  }
  return obj;
};


export const POST = async (dispatch, URL = '', body, config = null) => {
  let obj;
  await axios.post(`/seguranca${URL}`, body, config)
    .then(data => { obj = data; })
    .catch(err => {
      if (err.response && err.response.data) {
        obj = {
          data: err.response.data,
          status: err.response.status
        };
      } else {
        // 404
        obj = {
          data: {},
          status: 0
        };
      }
    });
  if (obj.status === 401) {
    // await sessionStorage.setItem('sistemas', '');
    logout(dispatch);
  }
  return obj;
};

export const PUT = async (dispatch, URL = '', body, config = null) => {
  let obj;
  await axios.put(`/seguranca${URL}`, body, config)
    .then(data => { obj = data; })
    .catch(err => {
      if (err.response && err.response.data) {
        obj = {
          data: err.response.data,
          status: err.response.status
        };
      } else {
        // 404
        obj = {
          data: {},
          status: 0
        };
      }
    });
  if (obj.status === 401) {
    // await sessionStorage.setItem('sistemas', '');
    logout(dispatch);
  }
  return obj;
};

export const DELETE = async (dispatch, URL = '', config = null) => {
  let obj;
  await axios.delete(`/seguranca${URL}`, config)
    .then(data => { obj = data; })
    .catch(err => {
      if (err.response && err.response.data) {
        obj = {
          data: err.response.data,
          status: err.response.status
        };
      } else {
        // 404
        obj = {
          data: {},
          status: 0
        };
      }
    });
  if (obj.status === 401) {
    // await sessionStorage.setItem('sistemas', '');
    logout(dispatch);
  }
  return obj;
};
