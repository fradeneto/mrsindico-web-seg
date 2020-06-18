import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputAdornment from '@material-ui/core/InputAdornment';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import ArrowForward from '@material-ui/icons/ArrowForward';
import Paper from '@material-ui/core/Paper';
import Hidden from '@material-ui/core/Hidden';
import brand from 'api/dummy/brand';
import logo from 'images/logo_frade_login.png';
import logoDark from 'images/logo_frade_login.png';
import TextField from '@material-ui/core/TextField';
import { useFormik } from 'formik';
import Checkbox from '@material-ui/core/Checkbox';
import { MsgSnackbar } from 'components';
import styles from '../user-jss';
import { login, storageEmail } from '../../../../services/AuthService';

const LinkBtn = React.forwardRef((props, ref) =>
  // eslint-disable-line
   <NavLink to={props.to} {...props} innerRef={ref} /> // eslint-disable-line
);

const LoginForm = props => {
  const {
    classes, pristine, submitting, deco
  } = props;

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };

  const validateForm = values => {
    const errors = {};

    if (!values.email) {
      // https://github.com/formatjs/react-intl/blob/master/docs/API.md#injection-api
      errors.email = 'Campo obrigatório';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = 'Você precisa digitar um e-mail válido';
    }

    if (!values.password) {
      errors.password = 'Campo obrigatório';
    }

    return errors;
  };

  const submitForm = async (values, { setSubmitting }) => {
    const resp = await login(props.dispatch, values.email, values.password);

    if (values.remember) {
      console.log('storageEmail');
      localStorage.setItem('storagedEmail', values.email);
    } else {
      console.log('deleteEmail');
      localStorage.setItem('storagedEmail', '');
    }

    if (resp) {
      formik.setStatus(resp);
      setSubmitting(false);
    } else {
      props.history.push('/app');
    }
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      remember: false
    },
    validate: validateForm,
    onSubmit: (values, actions) => {
      submitForm(values, actions);
    }
  });

  useEffect(() => {
    const loadValues = async () => {
      const storagedEmail = await localStorage.getItem('storagedEmail');
      if (storagedEmail) {
        formik.setFieldValue('email', storagedEmail);
        formik.setFieldValue('remember', true);
      }
    };
    loadValues();
  }, []);

  return (
    <>
      <Hidden mdUp>
        <NavLink to="/" className={classNames(classes.brand, classes.outer)}>
          <img src={logoDark} alt={brand.name} style={{ height: 40, width: 115 }} />
        </NavLink>
      </Hidden>
      <Paper className={classNames(classes.paperWrap, deco && classes.petal)}>
        <Hidden smDown>
          <div className={classes.topBar}>
            <NavLink to="/">
              <img src={logo} alt={brand.name} style={{ height: 50 }} />
            </NavLink>
            {/*
              <Button size="small" className={classes.buttonLink} component={LinkBtn} to="/register">
                <Icon className={classes.icon}>arrow_forward</Icon>
                Criar conta
              </Button>
              */}
          </div>
        </Hidden>
        <Typography variant="h4" className={classes.title} gutterBottom>
          Entrar
        </Typography>

        <section className={classes.formWrap}>
          <form
            noValidate
            autoComplete="off"
            onSubmit={formik.handleSubmit}
          >
            {formik.status && (
              <MsgSnackbar
                variant="error"
                className={classes.margin}
                message={formik.status}
                onClose={() => {
                  formik.setStatus('');
                }}
              />
            )}

            <div>
              <TextField
                type="email"
                fullWidth
                label="Email"
                margin="normal"
                className="kt-width-full"
                name="email"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.email}
                helperText={formik.touched.email && formik.errors.email}
                error={Boolean(formik.touched.email && formik.errors.email)}
              />
            </div>

            <div>
              <TextField
                type={showPassword ? 'text' : 'password'}
                fullWidth
                margin="normal"
                label="Password"
                className="kt-width-full"
                name="password"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.password}
                helperText={formik.touched.password && formik.errors.password}
                error={Boolean(
                  formik.touched.password && formik.errors.password
                )}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="Toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
            </div>

            <div className={classes.optArea}>
              <FormControlLabel
                control={(
                  <Checkbox
                    name="remember"
                    checked={formik.values.remember}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value="remember"
                  />
                )}
                label="Lembrar meu e-mail"
              />
              <Button
                size="small"
                component={LinkBtn}
                to="/recover-password"
                className={classes.buttonLink}
              >
                Esqueci minha senha
              </Button>
            </div>
            <div className={classes.btnArea}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                type="submit"
                disabled={formik.isSubmitting}
              >
                Continue
                <ArrowForward
                  className={classNames(classes.rightIcon, classes.iconSmall)}
                  disabled={submitting || pristine}
                />
              </Button>
            </div>
          </form>
        </section>
      </Paper>
    </>
  );
};

const reducerLogin = 'login';
const reducerUi = 'ui';
const FormInit = connect(state => ({
  force: state,
  initialValues: state.getIn([reducerLogin, 'usersLogin']),
  deco: state.getIn([reducerUi, 'decoration'])
}))(LoginForm);

export default withStyles(styles)(FormInit);

/*


// eslint-disable-next-line
class LoginForm extends React.Component {

  render() {

    const { showPassword } = this.state;

    const submitForm = (values, setSubmitting ) => {
      setTimeout(() => {
        alert(JSON.stringify(values, null, 2));
        setSubmitting(false);
      }, 1000);
    }

    return (

    );
  }
}


LoginForm.propTypes = {
  classes: PropTypes.object.isRequired,
  //handleSubmit: PropTypes.func.isRequired,
  //pristine: PropTypes.bool.isRequired,
  //submitting: PropTypes.bool.isRequired,
  deco: PropTypes.bool.isRequired,
};

const LoginFormik = withFormik({
  mapPropsToValues: () => ({ email: '', password: '', remeber: false }),

  // Custom sync validation
  validate: validateForm,

  handleSubmit: (values, { setSubmitting }) => {
    //LoginForm.submitForm(values, setSubmitting)
    //console.log(props)
  },
})(LoginForm);

const reducerLogin = 'login';
const reducerUi = 'ui';
const FormInit = connect(
  state => ({
    force: state,
    initialValues: state.getIn([reducerLogin, 'usersLogin']),
    deco: state.getIn([reducerUi, 'decoration'])
  }),
)(LoginFormik);

export default withStyles(styles)(FormInit);
*/
