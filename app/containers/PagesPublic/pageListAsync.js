import Loadable from 'react-loadable';
import Loading from 'components/Loading';

export const Login = Loadable({
  loader: () => import('./Auth/Login/Login'),
  loading: Loading,
});
export const Register = Loadable({
  loader: () => import('./Auth/Register/Register'),
  loading: Loading,
});
export const RecoverPassword = Loadable({
  loader: () => import('./Auth/RecoverPassword/RecoverPassword'),
  loading: Loading,
});
export const ResetPassword = Loadable({
  loader: () => import('./Auth/ResetPassword/ResetPassword'),
  loading: Loading,
});
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

export const Parent = Loadable({
  loader: () => import('../Parent'),
  loading: Loading,
});
