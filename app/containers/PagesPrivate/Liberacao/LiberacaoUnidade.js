import React, { useEffect, useState, useRef } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import AddCircle from '@material-ui/icons/AddCircle';

import { SelectSuggestion, MsgSnackbar } from 'components';

import { listUnidades } from '../../../services/UnidadeService';
import { listEmpresas } from '../../../services/EmpresaService';

const LiberacaoUnidade = props => {
  const { classes, addUnidade } = props;
  const [unidadeValue, setUnidadeValue] = useState({});
  const [liberadoPor, setLiberadoPor] = useState('');
  const [unidades, setUnidades] = useState([{ label: '', value: 0 }]);
  const [addError, setAddError] = React.useState('');
  const refSelectSuggestion = useRef(null);

  const loadUnidades = async () => {
    const resposta = await listUnidades();
    const unds = resposta.map(und => ({ value: und.id, label: `${und.grupo.nome} / ${und.nome}`, empresa_id: 999 }));
    const respEmpresas = await listEmpresas();
    const empresas = respEmpresas.map(emp => ({ value: 99999, label: `${emp.nome_fantasia}`, empresa_id: emp.id }));
    setUnidades([...unds, ...empresas]);
  };

  useEffect(() => {
    loadUnidades();
  }, []);

  const getSelectValue = value => {
    setUnidadeValue(value);
  };

  const handleChangeLiberadoPor = event => {
    setLiberadoPor(event.target.value);
  };

  const handleAdd = () => {
    if (!unidadeValue) {
      setAddError('Unidade?');
      return;
    }
    if (unidadeValue && Object.keys(unidadeValue).length <= 0) {
      setAddError('Unidade?');
      return;
    }
    if (!liberadoPor) {
      setAddError('Liberador por?');
      return;
    }
    setAddError('');
    addUnidade(unidadeValue, liberadoPor);
    setUnidadeValue({});
    setLiberadoPor('');
    if (refSelectSuggestion.current) refSelectSuggestion.current.clearField();
  };

  return (
    <div className={classes.container}>
      <div>
        <SelectSuggestion
          ref={refSelectSuggestion}
          label="Unidade / Empresa"
          placeholder="Unidade ou Empresa"
          suggestions={unidades}
          callback={getSelectValue}
        />
      </div>
      <div>
        <div className={classes.row2}>
          <div className={classes.row2col1}>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="name-simple">Liberado Por</InputLabel>
              <Input id="name-simple" value={liberadoPor} onChange={handleChangeLiberadoPor} />
            </FormControl>
          </div>
          <div className={classes.row2col2}>
            <Button size="small" onClick={handleAdd} className={classes.btnAction}>
              <AddCircle />
              {' '}
          &nbsp;
          Add
            </Button>
          </div>
        </div>

      </div>
      <div style={{ marginTop: '10px' }}>
        {addError && (
          <MsgSnackbar
            variant="error"
            className={classes.margin}
            message={addError}
            onClose={() => {
              setAddError('');
            }}
          />
        )}
      </div>
    </div>

  );
};

LiberacaoUnidade.propTypes = {
  classes: PropTypes.object.isRequired,
  addUnidade: PropTypes.func.isRequired
};

const styles = {
  container: {

  },
  formControl: {
    width: '100%'
  },
  row2: {
    display: 'flex'
  },
  row2col1: {

  },
  row2col2: {
    paddingTop: '20px',
    paddingLeft: '20px'
  }
};

export default withStyles(styles)(LiberacaoUnidade);
