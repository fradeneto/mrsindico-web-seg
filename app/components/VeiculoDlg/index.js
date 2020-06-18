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
import moment from 'moment';
import 'moment/locale/pt-br';
import * as Yup from 'yup';
import { TextMaskPlaca, TextMaskAno } from '../TextMasks';
import MsgSnackbar from '../MsgSnackbar';
import { getMarcas } from '../../services/VeiculoMarcaService';
import { getCores } from '../../services/VeiculoCorService';
import { getVeiculo, saveVeiculo } from '../../services/VeiculoService';
import styles from './veiculodlg-jss';

moment.locale('pt-br');

const VeiculoDlg = (props) => {
  const {
    classes,
    veiculoId,
    unidadeId,
    disableBackdropClick,
    open,
    handleClose,
    maxWidth,
  } = props;

  const [dialogTitle, setDialogTitle] = useState('');
  const [msgError, setMsgError] = useState('');
  const [marcaId, setMarcaId] = useState('');
  const [marcas, setMarcas] = useState([]);
  const [modelos, setModelos] = useState([]);
  const [cores, setCores] = useState([]);

  const carregaDados = async () => {
    await formik.setFieldValue('unidade_id', unidadeId);
    const dbMarcas = await getMarcas();
    if (dbMarcas && dbMarcas.data) {
      await setMarcas(dbMarcas.data);
    }
    const dbCores = await getCores();
    if (dbCores && dbCores.data) {
      await setCores(dbCores.data);
    }

    if (veiculoId && veiculoId > 0) {
      setDialogTitle('Editar Veículo');
      const response = await getVeiculo(veiculoId);
      if (response.data) {
        const vec = response.data;
        console.log(vec.modelo.marca_id);
        await setMarcaId(vec.modelo.marca_id);
        formik.setFieldValue('id', veiculoId);
        formik.setFieldValue('modelo_id', vec.modelo_id);
        formik.setFieldValue('cor_id', vec.cor_id);
        formik.setFieldValue('placa', vec.placa);
        formik.setFieldValue('ano_modelo', vec.ano_modelo);
        formik.setFieldValue('blindado', vec.blindado);
      }
    }
  };

  const VeiculoSchema = Yup.object().shape({
    modelo_id: Yup.number()
      .typeError('Você precisa selecionar o modelo')
      .min(1, 'Você precisa selecionar o modelo')
      .required('Você precisa selecionar o modelo'),
    cor_id: Yup.number()
      .min(1, 'Você precisa selecionar a cor')
      .required('Você precisa selecionar a cor'),
    ano_modelo: Yup.number()
      .typeError('Você precisa informar o ano')
      .min(1900, 'O Ano informado está muito baixo')
      .required('Você precisa informar o ano'),
    blindado: Yup.boolean().required('O veículo é blindado?')
  });

  const validateForm = async (values) => {
    const errors = {};

    return errors;
  };

  const submitForm = async (values, form) => {
    console.log('submit');
    const response = await saveVeiculo(values);
    console.log(response);
    if (response.data) {
      handleClose();
    }
  };

  const formik = useFormik({
    initialValues: {
      id: null,
      unidade_id: null,
      modelo_id: 0,
      cor_id: 0,
      placa: '',
      ano_modelo: '',
      blindado: '',
    },
    validationSchema: VeiculoSchema,
    validate: validateForm,
    onSubmit: submitForm,
  });


  useEffect(() => {
    const loadValues = async () => {
      if (veiculoId && veiculoId > 0) {
        // setDialogTitle('Editar Veículo');
        // const response = await getVeiculo(veiculoId);
        // if (response.data) {
        //  const vec = response.data;
        //  console.log(vec.modelo.marca_id);
        // setMarcaId(vec.modelo.marca_id);
        // formik.setFieldValue('modelo_id', vec.modelo_id);
        // }
        /* const response = await getPrestador(prestadorId);
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
        } */
      }
    };
    loadValues();
  }, [veiculoId]);

  const limpaDados = async () => {
    setDialogTitle('Adicionar Veículo');
    formik.setFieldValue('id', null);
    formik.setFieldValue('unidade_id', null);
    formik.setFieldValue('modelo_id', 0);
    formik.setFieldValue('cor_id', 0);
    formik.setFieldValue('placa', '');
    formik.setFieldValue('ano_modelo', '');
    formik.setFieldValue('blindado', '');
  };

  useEffect(() => {
    if (!open) {
      limpaDados();
    } else {
      carregaDados();
    }
  }, [open]);

  useEffect(() => {
    if (marcaId && marcaId > 0) {
      formik.setFieldValue('modelo_id', null);
      const marcaFiltrada = marcas.filter(marca => {
        if (marca.id === marcaId) {
          return true;
        }
        return false;
      });
      setModelos(marcaFiltrada[0].modelos);
    } else {
      setModelos([]);
    }
  }, [marcaId]);


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
                setMsgError('');
              }}
            />
          )}
          <div className={classes.divRow}>
            <div className={classes.divCol}>
              <TextField
                select
                fullWidth
                label="Marca"
                margin="normal"
                className="kt-width-full"
                name="marca"
                onChange={event => setMarcaId(event.target.value)}
                value={marcaId}
              >
                {marcas.map(marca => (<MenuItem key={marca.id} value={marca.id}>{marca.marca}</MenuItem>))}
              </TextField>
            </div>
            <div className={classes.divCol}>
              <TextField
                select
                fullWidth
                label="Modelo"
                margin="normal"
                className="kt-width-full"
                name="modelo_id"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.modelo_id}
                helperText={formik.touched.modelo_id && formik.errors.modelo_id}
                error={Boolean(formik.touched.modelo_id && formik.errors.modelo_id)}
              >
                {!marcaId && (<MenuItem value={0}>Selecione uma Marca</MenuItem>)}
                {modelos.map(modelo => (<MenuItem key={modelo.id} value={modelo.id}>{modelo.modelo}</MenuItem>))}
              </TextField>
            </div>
          </div>
          <div className={classes.divRow}>
            <div className={classes.divCol}>
              <TextField
                select
                fullWidth
                label="Cor"
                margin="normal"
                className="kt-width-full"
                name="cor_id"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.cor_id}
                helperText={formik.touched.cor_id && formik.errors.cor_id}
                error={Boolean(formik.touched.cor_id && formik.errors.cor_id)}
              >
                {cores.map(cor => (
                  <MenuItem key={cor.id} value={cor.id}>
                    <strong style={{
                      border: 'solid 1px', borderColor: '#000000', backgroundColor: `#${cor.rgb}`, width: 20, marginRight: 10
                    }}
                    >
&nbsp; &nbsp; &nbsp;
                    </strong>
                    {cor.nome}
                  </MenuItem>
                ))}
              </TextField>
            </div>
            <div className={classes.divCol}>
              <TextField
                autoComplete="nope"
                type="text"
                fullWidth
                label="Placa"
                margin="normal"
                className="kt-width-full"
                name="placa"
                onBlur={formik.handleBlur}
                onChange={event => formik.setFieldValue('placa', event.target.value.toUpperCase())}
                value={formik.values.placa}
                helperText={formik.touched.placa && formik.errors.placa}
                error={Boolean(formik.touched.placa && formik.errors.placa)}
                InputProps={{
                  inputComponent: TextMaskPlaca,
                }}
              />
            </div>
          </div>
          <div className={classes.divRow}>
            <div className={classes.divCol}>
              <TextField
                autoComplete="nope"
                type="text"
                fullWidth
                label="Ano"
                margin="normal"
                className="kt-width-full"
                name="ano_modelo"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.ano_modelo}
                helperText={formik.touched.ano_modelo && formik.errors.ano_modelo}
                error={Boolean(formik.touched.ano_modelo && formik.errors.ano_modelo)}
                InputProps={{
                  inputComponent: TextMaskAno,
                }}
              />
            </div>
            <div className={classes.divCol}>
              <TextField
                select
                fullWidth
                label="Blindado"
                margin="normal"
                className="kt-width-full"
                name="blindado"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.blindado}
                helperText={formik.touched.blindado && formik.errors.blindado}
                error={Boolean(formik.touched.blindado && formik.errors.blindado)}
              >
                <MenuItem value>SIM</MenuItem>
                <MenuItem value={false}>NÃO</MenuItem>
              </TextField>
            </div>
          </div>
          <div>&nbsp;</div>
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

VeiculoDlg.propTypes = {
  classes: PropTypes.object.isRequired,
  veiculoId: PropTypes.number.isRequired,
  unidadeId: PropTypes.number.isRequired,
  disableBackdropClick: PropTypes.bool,
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  maxWidth: PropTypes.string
};

VeiculoDlg.defaultProps = {
  disableBackdropClick: true,
  maxWidth: 'md',
};

export default withStyles(styles)(VeiculoDlg);
