import axios from 'axios';

const UNIDADE_URL = '/admin/unidade';
const UNIDADE_TABLE_URL = UNIDADE_URL + '/table';
const UNIDADE_MORADORES_URL = UNIDADE_URL + '/moradores';

export const getTable = async (query) => {
  query.typeList = 'table';
  return axios.get(UNIDADE_URL, { params: { obj: JSON.stringify(query) } });
};

export const getMoradores = async (unidadeId, query) => {
  query.typeList = 'table';
  return axios.get(UNIDADE_URL + `/${unidadeId}/moradores`, { params: { obj: JSON.stringify(query) } });
};

export const getVisitantes = async (unidadeId, query) => {
  query.typeList = 'table';
  return axios.get(UNIDADE_URL + `/${unidadeId}/visitantes`, { params: { obj: JSON.stringify(query) } });
};

export const getPrestadores = async (unidadeId, query) => {
  query.typeList = 'table';
  return axios.get(UNIDADE_URL + `/${unidadeId}/prestadores`, { params: { obj: JSON.stringify(query) } });
};
export const getVeiculos = async (unidadeId, query) => {
  query.typeList = 'table';
  return axios.get(UNIDADE_URL + `/${unidadeId}/veiculos`, { params: { obj: JSON.stringify(query) } });
};
