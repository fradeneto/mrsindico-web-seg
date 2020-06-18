import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { DatePicker, KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import TextField from '@material-ui/core/TextField';
import { useFormik } from 'formik';
import MomentUtils from '@date-io/moment';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { validCPF } from 'frade-utils/validation';
import { TextMaskCpf, TextMaskTelefone, TextMaskCelular } from 'components/TextMasks';
import MenuItem from '@material-ui/core/MenuItem';

const styles = theme => ({
  demo: {
    height: '60px',
  },
  divider: {
    margin: '5px 0',
  },
  picker: {
    margin: '5px 5px',
  },
  divRow: {
    display: 'flex'
  },
  divCol: {
    height: '80px',
    minWidth: '200px',
    width: '320px',
    marginLeft: '5px',
    marginRight: '5px'
  }
});

const AddMoradorForm = props => {
  const { classes, formRef } = props;

  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const validateForm = values => {
    const errors = {};

    if (!values.nome) {
      errors.nome = 'Você precisa digitar o nome';
    }
    if (values.email && (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email))) {
      errors.email = 'Você precisa digitar um e-mail válido';
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

      }
    }

    return errors;
  };

  const submitForm = async (values, { setSubmitting }) => {
    alert(JSON.stringify(values));
    setSubmitting(false);
  };


  const formik = useFormik({
    initialValues: {
      nome: '',
      nome_chamado: '',
      cpf: '',
      rg: '',
      email: '',
      nascimento: '',
      sexo: '',
      tratamento: '',
      telefone: '',
      celular1: '',
      celular2: ''
    },
    validate: validateForm,
    onSubmit: (values, actions) => {
      submitForm(values, actions);
    }
  });

  return (
    <>
      <form
        noValidate
        autoComplete="off"
        onSubmit={formik.handleSubmit}
      >
        <div className={classes.divRow}>
          <div className={classes.divCol}>
            <TextField
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
              type="text"
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
            />
          </div>
          <div className={classes.divCol}>
            <TextField
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
            <MuiPickersUtilsProvider utils={MomentUtils}>
              <KeyboardDatePicker
                label="Nascimento"
                format="DD/MM/YYYY"
                placeholder="10/10/2018"
                value={selectedDate}
                onChange={handleDateChange}
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
          <div className={classes.divCol}>
            <TextField
              type="text"
              fullWidth
              label="Telefone"
              margin="normal"
              className="kt-width-full"
              name="cpf"
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
          <div className={classes.divCol}>
            <TextField
              type="text"
              fullWidth
              label="Celular 1"
              margin="normal"
              className="kt-width-full"
              name="cpf"
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
        </div>
        <Button ref={formRef} type="submit" style={{ display: 'none' }}>enviar</Button>
      </form>
    </>
  );
};

export default withStyles(styles)(AddMoradorForm);
