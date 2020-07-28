import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { withStyles } from '@material-ui/core/styles';
import AddCircle from '@material-ui/icons/AddCircle';
import AddToPhotos from '@material-ui/icons/AddToPhotos';
import Button from '@material-ui/core/Button';

import { listUnidades } from '../../../services/UnidadeService';

const mock_unidades = [
  { title: 'Torre 1 / Apto 11', id: 111 },
  { title: 'Torre 1 / Apto 12', id: 112 },
  { title: 'Torre 1 / Apto 13', id: 113 },
  { title: 'Torre 1 / Apto 14', id: 114 },
  { title: 'Torre 2 / Apto 31', id: 231 },
  { title: 'Torre 2 / Apto 32', id: 232 },
  { title: 'Torre 2 / Apto 33', id: 233 },
  { title: 'Torre 2 / Apto 34', id: 234 },
];

const LiberacaoUnidade = props => {
  const { classes, addUnidade } = props;
  const [selectedUnidade, setSelectedUnidade] = useState({});
  const [liberadoPor, setliberadoPor] = useState();
  const [unidades, setUnidades] = useState([{ title: '', id: 0 }]);

  const loadUnidades = async () => {
    const resposta = await listUnidades();
    const unds = resposta.map(und => ({ id: und.id, title: `${und.grupo.nome} / ${und.nome}` }));
    setUnidades(unds);
    // console.log(unds);
  };

  useEffect(() => {
    loadUnidades();
  }, []);

  return (
    <div className={classes.container}>
      <div>
        <Autocomplete
          options={unidades}
          onChange={(event, value) => setSelectedUnidade(value)}
          getOptionLabel={(option) => option.title}
          style={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Unidade" variant="outlined" />}
        />
      </div>
      <div className={classes.liberado}>
        <TextField value={liberadoPor} onChange={(event) => setliberadoPor(event.target.value)} label="Liberador por" variant="outlined" />
        <Button size="small" onClick={() => (addUnidade(selectedUnidade, liberadoPor))} className={classes.btnAction}>
          <AddCircle />
          {' '}
          &nbsp;
          Add
        </Button>
      </div>
    </div>

  );
};

const styles = {
  container: {
    width: '100%',
  },
  liberado: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '10px'
  }
};

export default withStyles(styles)(LiberacaoUnidade);
