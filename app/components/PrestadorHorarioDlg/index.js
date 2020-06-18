import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Switch from '@material-ui/core/Switch';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useFormik } from 'formik';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { getPrestador, updatePrestador } from 'services/PrestadorService';
import { TimePicker, KeyboardTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import moment from 'moment';
import 'moment/locale/pt-br';
import { TextMaskCpf, TextMaskTelefone, TextMaskCelular } from '../TextMasks';
import MsgSnackbar from '../MsgSnackbar';
import styles from './prestadorhordlg-jss';

moment.locale('pt-BR');

const CadastroDlg = (props) => {
  const {
    classes,
    prestadorId,
    disableBackdropClick,
    open,
    handleClose,
    maxWidth,
    msgError
  } = props;

  const dias = [
    { nome: 'Domingo', abrev: 'dom' },
    { nome: 'Segunda-feira', abrev: 'seg' },
    { nome: 'Terça-feira', abrev: 'ter' },
    { nome: 'Quarta-feira', abrev: 'qua' },
    { nome: 'Quinta-feira', abrev: 'qui' },
    { nome: 'Sexta-feira', abrev: 'sex' },
    { nome: 'Sábado', abrev: 'sab' }
  ];

  const validateForm = async (values) => {
    const errors = {};

    return errors;
  };

  const submitForm = async (values, form) => {
    // alert(JSON.stringify(values));
    const prestador = {};
    prestador.id = values.id;
    dias.map(dia => {
      prestador[`${dia.abrev}_entrada`] = values[`${dia.abrev}_entrada`].format('HH:mm');
      prestador[`${dia.abrev}_saida`] = values[`${dia.abrev}_saida`].format('HH:mm');
      prestador[`${dia.abrev}_saida_tolerancia`] = values[`${dia.abrev}_saida_tolerancia`].format('HH:mm');
      prestador[`${dia.abrev}_habilitado`] = values[`${dia.abrev}_habilitado`];
    });

    const response = await updatePrestador(prestador);
    if (response.data) {
      handleClose();
    }
  };

  const formik = useFormik({
    initialValues: {
      id: null,
      dom_habilitado: false,
      dom_entrada: moment('00:00', 'HH:mm'),
      dom_saida: moment('00:00', 'HH:mm'),
      dom_saida_tolerancia: moment('01:00', 'HH:mm'),
      seg_habilitado: false,
      seg_entrada: moment('00:00', 'HH:mm'),
      seg_saida: moment('00:00', 'HH:mm'),
      seg_saida_tolerancia: moment('01:00', 'HH:mm'),
      ter_habilitado: false,
      ter_entrada: moment('00:00', 'HH:mm'),
      ter_saida: moment('00:00', 'HH:mm'),
      ter_saida_tolerancia: moment('01:00', 'HH:mm'),
      qua_habilitado: false,
      qua_entrada: moment('00:00', 'HH:mm'),
      qua_saida: moment('00:00', 'HH:mm'),
      qua_saida_tolerancia: moment('01:00', 'HH:mm'),
      qui_habilitado: false,
      qui_entrada: moment('00:00', 'HH:mm'),
      qui_saida: moment('00:00', 'HH:mm'),
      qui_saida_tolerancia: moment('01:00', 'HH:mm'),
      sex_habilitado: false,
      sex_entrada: moment('00:00', 'HH:mm'),
      sex_saida: moment('00:00', 'HH:mm'),
      sex_saida_tolerancia: moment('01:00', 'HH:mm'),
      sab_habilitado: false,
      sab_entrada: moment('00:00', 'HH:mm'),
      sab_saida: moment('00:00', 'HH:mm'),
      sab_saida_tolerancia: moment('01:00', 'HH:mm'),
    },
    validate: validateForm,
    onSubmit: submitForm,
  });

  const [dialogTitle, setDialogTitle] = useState('');
  useEffect(() => {
    const loadValues = async () => {
      if (prestadorId && prestadorId > 0) {
        const response = await getPrestador(prestadorId);
        if (response.data) {
          const prestador = response.data;
          setDialogTitle(prestador.cadastro.nome);
          formik.setFieldValue('id', prestador.id);

          dias.map(dia => {
            formik.setFieldValue(`${dia.abrev}_entrada`, moment(prestador[`${dia.abrev}_entrada`], 'HH:mm:ss'));
            formik.setFieldValue(`${dia.abrev}_saida`, moment(prestador[`${dia.abrev}_saida`], 'HH:mm:ss'));
            formik.setFieldValue(`${dia.abrev}_saida_tolerancia`, moment(prestador[`${dia.abrev}_saida_tolerancia`], 'HH:mm:ss'));
            formik.setFieldValue(`${dia.abrev}_habilitado`, prestador[`${dia.abrev}_habilitado`]);
          });
        }
      }
    };
    loadValues();
  }, [prestadorId]);

  const limpaDados = async () => {
    setDialogTitle('');
    formik.setFieldValue('id', null);
    dias.map(dia => {
      formik.setFieldValue(`${dia.abrev}_entrada`, moment('00:00:00', 'HH:mm:ss'));
      formik.setFieldValue(`${dia.abrev}_saida`, moment('00:00:00', 'HH:mm:ss'));
      formik.setFieldValue(`${dia.abrev}_saida_tolerancia`, moment('00:00:00', 'HH:mm:ss'));
      formik.setFieldValue(`${dia.abrev}_habilitado`, false);
    });
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
      onClose={handleClose}
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
          <Table className={classNames(classes.table, classes.stripped)}>
            <TableHead>
              <TableRow>
                <TableCell>Dia</TableCell>
                <TableCell align="center">Habilitado</TableCell>
                <TableCell align="center">Entrada</TableCell>
                <TableCell align="center">Saída</TableCell>
                <TableCell align="center">Tolerância Saída</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              { dias.map(dia => (
                <TableRow key={dia.nome} style={{ padding: 0 }}>
                  <TableCell style={{ padding: 0 }}>{dia.nome}</TableCell>
                  <TableCell align="center" style={{ padding: 0 }}>
                    <Switch
                      checked={formik.values[`${dia.abrev}_habilitado`]}
                      onChange={event => {
                        formik.setFieldValue(`${dia.abrev}_habilitado`, event.target.checked);
                      }}
                      value={`checked${dia.abrev}`}
                      color="primary"
                    />
                  </TableCell>
                  <TableCell align="center" style={{ padding: 0 }}>
                    <MuiPickersUtilsProvider utils={MomentUtils}>
                      <KeyboardTimePicker
                        disabled={!formik.values[`${dia.abrev}_habilitado`]}
                        ampm={false}
                        label={dia.nome}
                        value={formik.values[`${dia.abrev}_entrada`]}
                        onChange={date => {
                          formik.setFieldValue(`${dia.abrev}_entrada`, date);
                        }}
                        invalidDateMessage="Hora em formato inválido"
                        style={{ marginTop: '-8px', marginBottom: 5, width: 150 }}
                      />
                    </MuiPickersUtilsProvider>
                  </TableCell>
                  <TableCell align="center" style={{ padding: 0 }}>
                    <MuiPickersUtilsProvider utils={MomentUtils}>
                      <KeyboardTimePicker
                        disabled={!formik.values[`${dia.abrev}_habilitado`]}
                        ampm={false}
                        label={dia.nome}
                        value={formik.values[`${dia.abrev}_saida`]}
                        onChange={date => {
                          formik.setFieldValue(`${dia.abrev}_saida`, date);
                        }}
                        invalidDateMessage="Hora em formato inválido"
                        style={{ marginTop: '-8px', marginBottom: 5, width: 150 }}
                      />
                    </MuiPickersUtilsProvider>
                  </TableCell>
                  <TableCell align="center" style={{ padding: 0 }}>
                    <MuiPickersUtilsProvider utils={MomentUtils}>
                      <KeyboardTimePicker
                        disabled={!formik.values[`${dia.abrev}_habilitado`]}
                        ampm={false}
                        label={dia.nome}
                        value={formik.values[`${dia.abrev}_saida_tolerancia`]}
                        onChange={date => {
                          formik.setFieldValue(`${dia.abrev}_saida_tolerancia`, date);
                        }}
                        invalidDateMessage="Hora em formato inválido"
                        style={{ marginTop: '-8px', marginBottom: 5, width: 150 }}
                      />
                    </MuiPickersUtilsProvider>
                  </TableCell>
                </TableRow>
              ))}


            </TableBody>
          </Table>
        </DialogContent>
        <DialogActions>
          <Button type="submit" variant="contained" color="primary">
          Salvar
          </Button>
          <Button onClick={handleClose} color="primary">
          Cancelar
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

CadastroDlg.propTypes = {
  classes: PropTypes.object.isRequired,
  prestadorId: PropTypes.number.isRequired,
  disableBackdropClick: PropTypes.bool,
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  maxWidth: PropTypes.string,
  msgError: PropTypes.string
};

CadastroDlg.defaultProps = {
  disableBackdropClick: true,
  maxWidth: 'md',
  msgError: ''
};

export default withStyles(styles)(CadastroDlg);

/*
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
*/
