import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import InputAdornment from "@material-ui/core/InputAdornment";
import Typography from "@material-ui/core/Typography";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import ArrowForward from "@material-ui/icons/ArrowForward";
import Paper from "@material-ui/core/Paper";
import Hidden from "@material-ui/core/Hidden";
import brand from "api/dummy/brand";
import logo from "images/logo_frade_login.png";
import logoDark from "images/logo_frade_login.png";
import styles from "../user-jss";
import TextField from "@material-ui/core/TextField";
import { useFormik } from "formik";
import Checkbox from "@material-ui/core/Checkbox";
import { MsgSnackbar } from "components";
import { resetPassword } from "../../../../services/AuthService";

const LinkBtn = React.forwardRef(function LinkBtn(props, ref) {
  // eslint-disable-line
  return <NavLink to={props.to} {...props} innerRef={ref} />; // eslint-disable-line
});

const ResetForm = props => {
  const { classes, pristine, submitting, deco } = props;

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };

  const validateForm = values => {
    const errors = {};

    //var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    /*
      ^	The password string will start this way
      (?=.*[a-z])	The string must contain at least 1 lowercase alphabetical character
      (?=.*[A-Z])	The string must contain at least 1 uppercase alphabetical character
      (?=.*[0-9])	The string must contain at least 1 numeric character
      (?=.*[!@#$%^&*])	The string must contain at least one special character, but we are escaping reserved RegEx characters to avoid conflict
      (?=.{8,})	The string must be eight characters or longer
    */
    var passwordRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})");

    if (!passwordRegex.test(values.password)) {
      errors.password = "A Senha deve ter no mínimo 1 letra maiúscula, 1 letra minúscula e 1 número. A Senha também teve ter no mínimo 8 caracteres";
    }

    if (!values.password) {
      errors.password = "Campo obrigatório";
    }

    if (!values.password_confirm) {
      errors.password_confirm = "Campo obrigatório";
    }

    if (values.password_confirm !== values.password) {
      errors.password_confirm = "A Confirmação de Senha deve ser igual a Senha";
    }

    return errors;
  };

  const submitForm = async (values, { setSubmitting }) => {
    const resp = await resetPassword(values.password, props.recoverCode);

    if (resp) {
      formik.setStatus(resp);
      setSubmitting(false);
    } else {
      formik.setStatus('ok')
    }
    
  };

  const formik = useFormik({
    initialValues: {
      password: "",
      password_confirm: ""
    },
    validate: validateForm,
    onSubmit: (values, actions) => {
      submitForm(values, actions);
    }
  });

  useEffect(() => {
    /*
    const loadValues = async () => {
      const storagedEmail = await localStorage.getItem("storagedEmail");
      if (storagedEmail) {
        formik.setFieldValue("email", storagedEmail);
        formik.setFieldValue("remember", true);
      }
    };
    loadValues();
    */
  }, []);

  return (
    <>
      <Hidden mdUp>
        <NavLink to="/" className={classNames(classes.brand, classes.outer)}>
          <img src={logoDark} alt={brand.name} style={{height: 40, width: 115}} />
        </NavLink>
      </Hidden>
      <Paper className={classNames(classes.paperWrap, deco && classes.petal)}>
        <Hidden smDown>
          <div className={classes.topBar}>
            <NavLink to="/">
              <img src={logo} alt={brand.name} style={{height: 50}} />
            </NavLink>
          </div>
        </Hidden>
        <Typography variant="h4" className={classes.title} gutterBottom>
          Digite sua nova senha
        </Typography>

        <section className={classes.formWrap}>
          <form
            noValidate={true}
            autoComplete="off"
            onSubmit={formik.handleSubmit}
          >
            {formik.status && formik.status !== "ok" && (
                  <MsgSnackbar
                    style={{ marginTop: 10 }}
                    variant="error"
                    className={classes.margin}
                    message={formik.status}
                    onClose={() => {
                      formik.setStatus("");
                    }}
                  />
                )}

                {formik.status && formik.status === "ok" && (
                  <MsgSnackbar
                    style={{ marginTop: 10 }}
                    variant="success"
                    className={classes.margin}
                    message={"Senha alterada com sucesso!"}
                    onClose={() => {
                      formik.setStatus("");
                    }}
                  />
                )}

            <div>
              <TextField
                type={showPassword ? "text" : "password"}
                fullWidth
                margin="normal"
                label="Senha"
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
            <div>
              <TextField
                type={showPassword ? "text" : "password"}
                fullWidth
                margin="normal"
                label="Confirmação de Senha"
                className="kt-width-full"
                name="password_confirm"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.password_confirm}
                helperText={formik.touched.password_confirm && formik.errors.password_confirm}
                error={Boolean(
                  formik.touched.password_confirm && formik.errors.password_confirm
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

            
            <div className={classes.btnArea}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                type="submit"
                disabled={formik.isSubmitting}
              >
                Salvar nova senha
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

const reducerLogin = "login";
const reducerUi = "ui";
const FormInit = connect(state => ({
  force: state,
  initialValues: state.getIn([reducerLogin, "usersLogin"]),
  deco: state.getIn([reducerUi, "decoration"])
}))(ResetForm);

export default withStyles(styles)(FormInit);
