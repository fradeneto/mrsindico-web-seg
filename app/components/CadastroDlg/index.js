import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
// import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useFormik } from 'formik';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import moment from 'moment';
import MomentUtils from '@date-io/moment';
import 'moment/locale/pt-br';
import { validCPF } from 'frade-utils/validation';
import { DateTime, Settings } from 'luxon';
import * as Yup from 'yup';
import { TextMaskCpf, TextMaskTelefone, TextMaskCelular } from '../TextMasks';
import MsgSnackbar from '../MsgSnackbar';
import { consultaCPF, consultaEmail } from '../../services/CadastroService';
import styles from './cadastrodlg-jss';

moment.locale('pt-br');

const CadastroDlg = (props) => {
  const {
    classes,
    disableBackdropClick,
    open,
    handleClose,
    handleSalvar,
    dialogTitle,
    maxWidth,
    msgError
  } = props;

  const [dadosCarregados, setDadosCarregados] = useState({});
  const [emailConsultado, setEmailConsultado] = useState('');
  const [erroEmail, setErroEmail] = useState('');

  const carregaDados = async (cpf) => {
    if (!dadosCarregados.cpf || (dadosCarregados.cpf && dadosCarregados.cpf !== cpf)) {
      formik.setFieldValue('id', null);
      await setDadosCarregados({ cpf });

      const dados = await consultaCPF(cpf);
      if (dados) {
        await setDadosCarregados(dados);
        Object.keys(dados).forEach((item) => {
          if (typeof formik.values[item] !== 'undefined') {
            formik.setFieldValue(item, dados[item]);
            // console.log(item + ' = ' + formik.values[item]);
          }
        });
      }
    }
  };

  const emailExists = async (email) => {
    // console.log(`checkEmail:${email}:${emailConsultado}`);
    if (dadosCarregados && dadosCarregados.email === email) {
      await setErroEmail('');
      return;
    }
    if (email !== emailConsultado) {
      setEmailConsultado(email);
      const cad = await consultaEmail(email).catch(err => {
        setErroEmail('');
      });
      if (!cad) {
        await setErroEmail('');
        return;
      }
      if (cad && dadosCarregados && dadosCarregados.id === cad.id) {
        await setErroEmail('');
        return;
      }
      await setErroEmail('Este e-mail já está em uso');
    }
  };

  const CadastroSchema = Yup.object().shape({
    nome: Yup.string()
      .min(2, 'Nome muito curto')
      .max(120, 'Nome muito comprido')
      .required('Você precisa digitar o nome'),
    email: Yup.string()
      .email('Você precisa digitar um e-mail válido'),
  });

  const validateForm = async (values) => {
    const errors = {};

    if (values.email && (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email))) {
      await emailExists(values.email);
      if (erroEmail) {
        errors.email = erroEmail;
      }
    }

    if (values.cpf) {
      let cpf;
      cpf = values.cpf.replace(/\s/g, '');
      cpf = cpf.split('-').join('');
      cpf = cpf.split('.').join('');

      if (!validCPF(cpf)) {
        errors.cpf = 'CPF Inválido';
      } else {
        // Consulta CPF
        carregaDados(cpf);
      }
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      id: null,
      nome: '',
      nome_chamado: '',
      cpf: '',
      rg: '',
      email: '',
      nascimento: null,
      sexo: '',
      tratamento: '',
      telefone: '',
      celular1: '',
      celular2: ''
    },
    validationSchema: CadastroSchema,
    validate: validateForm,
    onSubmit: handleSalvar,
  });

  const limpaDados = async () => {
    Object.keys(formik.values).forEach((item) => {
      formik.setFieldValue(item, '');
    });
    formik.setFieldValue('id', null);
    formik.setFieldValue('nascimento', null);
    await setDadosCarregados({});
    setErroEmail('');
    handleClose();
  };

  useEffect(() => {
    if (!open) {
      limpaDados();
    }
  }, [open]);


  return (
    <Dialog
      disableBackdropClick={disableBackdropClick}
      open={open}
      onClose={limpaDados}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth={maxWidth}
    >
      <form
        noValidate
        onSubmit={formik.handleSubmit}
      >
        <DialogTitle id="alert-dialog-title" style={{ marginBottom: 0 }}>
          { dialogTitle }
        </DialogTitle>
        <DialogContent>
          { msgError && (
            <MsgSnackbar
              variant="error"
              message={msgError}
              onClose={() => {

              }}
            />
          )}
          <div className={classes.divRow}>
            <div className={classes.divCol}>
              <TextField
                autoComplete="nope"
                autoFocus
                type="text"
                fullWidth
                label="CPF"
                margin="normal"
                className="kt-width-full"
                name="cpf"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.cpf}
                helperText={formik.touched.cpf && formik.errors.cpf}
                error={Boolean(formik.touched.cpf && formik.errors.cpf)}
                InputProps={{
                  inputComponent: TextMaskCpf,
                }}
              />
            </div>
            <div className={classes.divCol}>
              <TextField
                autoComplete="nope"
                type="text"
                fullWidth
                label="Nome"
                margin="normal"
                className="kt-width-full"
                name="nome"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.nome}
                helperText={formik.touched.nome && formik.errors.nome}
                error={Boolean(formik.touched.nome && formik.errors.nome)}
              />
            </div>
          </div>
          <div className={classes.divRow}>
            <div className={classes.divCol}>
              <TextField
                autoComplete="nope"
                type="text"
                fullWidth
                label="RG"
                margin="normal"
                className="kt-width-full"
                name="nome"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.rg}
                helperText={formik.touched.rg && formik.errors.rg}
                error={Boolean(formik.touched.rg && formik.errors.rg)}
              />
            </div>
            <div className={classes.divCol}>
              <TextField
                autoComplete="nope"
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
          </div>
          <div className={classes.divRow}>
            <div className={classes.divCol}>
              <TextField
                select
                fullWidth
                label="Tratamento"
                margin="normal"
                className="kt-width-full"
                name="tratamento"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.tratamento}
                helperText={formik.touched.tratamento && formik.errors.tratamento}
                error={Boolean(formik.touched.tratamento && formik.errors.tratamento)}
              >
                <MenuItem key="N" value="">Não Informado</MenuItem>
                <MenuItem key="S" value="S">Sr(a)</MenuItem>
                <MenuItem key="D" value="D">Dr(a)</MenuItem>
              </TextField>
            </div>
            <div className={classes.divCol}>
              <TextField
                autoComplete="nope"
                type="text"
                fullWidth
                label="Como gostaria de ser chamado"
                margin="normal"
                className="kt-width-full"
                name="nome_chamado"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.nome_chamado}
                helperText={formik.touched.nome_chamado && formik.errors.nome_chamado}
                error={Boolean(formik.touched.nome_chamado && formik.errors.nome_chamado)}
              />
            </div>
          </div>
          <div className={classes.divRow}>
            <div className={classes.divCol}>
              <TextField
                select
                fullWidth
                label="Sexo"
                margin="normal"
                className="kt-width-full"
                name="sexo"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.sexo}
                helperText={formik.touched.sexo && formik.errors.sexo}
                error={Boolean(formik.touched.sexo && formik.errors.sexo)}
              >
                <MenuItem key="M" value="M">Masculino</MenuItem>
                <MenuItem key="F" value="F">Feminino</MenuItem>
                <MenuItem key="N" value="N">Prefiro não informar</MenuItem>
              </TextField>
            </div>
            <div className={classes.divCol}>
              <MuiPickersUtilsProvider libInstance={moment} utils={MomentUtils} locale="pt-br">
                <KeyboardDatePicker
                  label="Nascimento"
                  format="DD/MM/YYYY"
                  placeholder="08/03/1989"
                  value={formik.values.nascimento}
                  onChange={(date) => {
                    formik.setFieldValue('nascimento', date.format('YYYY-MM-DD'));
                  }}
                  animateYearScrolling={false}
                  maxDate={new Date()}
                  invalidDateMessage="Data em formato inválido"
                  minDateMessage="Data muito antiga"
                  maxDateMessage="A Data não pode ser maior que hoje"
                  style={{ marginTop: 16 }}
                />
              </MuiPickersUtilsProvider>
            </div>
          </div>
          <div className={classes.divRow}>
            <div className={classes.divCol3}>
              <TextField
                autoComplete="nope"
                type="text"
                fullWidth
                label="Telefone"
                margin="normal"
                className="kt-width-full"
                name="telefone"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.telefone}
                helperText={formik.touched.telefone && formik.errors.telefone}
                error={Boolean(formik.touched.telefone && formik.errors.telefone)}
                InputProps={{
                  inputComponent: TextMaskTelefone,
                }}
              />
            </div>
            <div className={classes.divCol3}>
              <TextField
                autoComplete="nope"
                type="text"
                fullWidth
                label="Celular 1"
                margin="normal"
                className="kt-width-full"
                name="celular1"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.celular1}
                helperText={formik.touched.celular1 && formik.errors.celular1}
                error={Boolean(formik.touched.celular1 && formik.errors.celular1)}
                InputProps={{
                  inputComponent: TextMaskCelular,
                }}
              />
            </div>
            <div className={classes.divCol3}>
              <TextField
                autoComplete="nope"
                type="text"
                fullWidth
                label="Celular 2"
                margin="normal"
                className="kt-width-full"
                name="celular2"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.celular2}
                helperText={formik.touched.celular2 && formik.errors.celular2}
                error={Boolean(formik.touched.celular2 && formik.errors.celular2)}
                InputProps={{
                  inputComponent: TextMaskCelular,
                }}
              />
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button type="submit" variant="contained" color="primary">
          Salvar
          </Button>
          <Button onClick={limpaDados} color="primary">
          Cancelar
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

CadastroDlg.propTypes = {
  classes: PropTypes.object.isRequired,
  disableBackdropClick: PropTypes.bool,
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleSalvar: PropTypes.func.isRequired,
  dialogTitle: PropTypes.string,
  maxWidth: PropTypes.string,
  msgError: PropTypes.string
};

CadastroDlg.defaultProps = {
  disableBackdropClick: true,
  dialogTitle: '',
  maxWidth: 'md',
  msgError: ''
};

export default withStyles(styles)(CadastroDlg);
