import Loadable from 'react-loadable';
import Loading from 'components/Loading';

export const Home = Loadable({
  loader: () => import('./Home/Home'),
  loading: Loading,
});
export const Liberacao = Loadable({
  loader: () => import('./Liberacao'),
  loading: Loading,
});

/*
export const Unidade = Loadable({
  loader: () => import('./Unidade/Unidade'),
  loading: Loading,
});
export const UnidadeTabela = Loadable({
  loader: () => import('./Unidade/UnidadeTabela'),
  loading: Loading,
});
*/

export const NotFound = Loadable({
  loader: () => import('../NotFound/NotFound'),
  loading: Loading,
});
export const NotFoundDedicated = Loadable({
  loader: () => import('../Pages/Standalone/NotFoundDedicated'),
  loading: Loading,
});
export const Error = Loadable({
  loader: () => import('../Pages/Error'),
  loading: Loading,
});
