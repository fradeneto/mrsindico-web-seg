import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import ArrowForward from '@material-ui/icons/ArrowForward';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import brand from 'api/dummy/brand';
import logo from 'images/logo_frade_login.png';
import logoDark from 'images/logo_frade_login.png';
import { useFormik } from 'formik';
import TextField from '@material-ui/core/TextField';
import { MsgSnackbar } from 'components';
import styles from '../user-jss';
import { recoverPassword } from '../../../../services/AuthService';

const subdomain = process.env.APP_SUBDOMAIN;

const ResetForm = props => {
  const {
    classes, deco, submitting, pristine
  } = props;

  const validateForm = values => {
    const errors = {};

    if (!values.email) {
      // https://github.com/formatjs/react-intl/blob/master/docs/API.md#injection-api
      errors.email = 'Campo obrigatório';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = 'Você precisa digitar um e-mail válido';
    }

    return errors;
  };

  const submitForm = async (values, { setSubmitting }) => {
    const resp = await recoverPassword(
      props.dispatch,
      values.email,
      subdomain
    );
    if (resp) {
      formik.setStatus(resp);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: '',
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
      }
    };
    loadValues();
  }, []);

  return (
    <Paper className={classNames(classes.paperWrap, deco && classes.petal)}>
      <div className={classes.topBar}>
        <NavLink to="/">
          <img src={logoDark} alt={brand.name} style={{ height: 50 }} />
        </NavLink>
      </div>
      <Typography variant="h4" className={classes.title} gutterBottom>
          Recuperar Senha
      </Typography>
      <Typography
        variant="caption"
        className={classes.subtitle}
        gutterBottom
        align="center"
      >
          Digite seu e-mail para recuperar sua senha
      </Typography>
      <section className={classes.formWrap}>
        <form
          noValidate
          autoComplete="off"
          onSubmit={formik.handleSubmit}
        >
          {formik.status && formik.status !== 'ok' && (
            <MsgSnackbar
              style={{ marginTop: 10 }}
              variant="error"
              className={classes.margin}
              message={formik.status}
              onClose={() => {
                formik.setStatus('');
              }}
            />
          )}

          {formik.status && formik.status === 'ok' && (
            <MsgSnackbar
              style={{ marginTop: 10 }}
              variant="success"
              className={classes.margin}
              message="E-mail enviado com sucesso!"
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

          <div className={classes.btnArea}>
            <Button variant="contained" color="primary" type="submit">
                    Enviar e-mail
              <ArrowForward
                className={classNames(
                  classes.rightIcon,
                  classes.iconSmall
                )}
                disabled={submitting || pristine}
              />
            </Button>
          </div>
        </form>
      </section>
    </Paper>
  );
};

ResetForm.propTypes = {
  classes: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
};

const reducer = 'ui';
const RegisterFormMapped = connect(state => ({
  force: state,
  deco: state.getIn([reducer, 'decoration'])
}))(ResetForm);

export default withStyles(styles)(RegisterFormMapped);
