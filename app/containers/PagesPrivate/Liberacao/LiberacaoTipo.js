import React, { Fragment, PureComponent } from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';

import { listTipos } from '../../../services/LiberacaoTipoService';

const mock_tipos = [
  { id: 1, tipo: 'Entrega - Água' },
  { id: 2, tipo: 'Entrega - Comida' },
  { id: 3, tipo: 'Entrega - Remédio' },
  { id: 4, tipo: 'Entrega - Outros' },
  { id: 5, tipo: 'Prestador - Instalação TV/Internet' },
  { id: 6, tipo: 'Prestador - Reforma' },
  { id: 7, tipo: 'Prestador - Outros' },
  { id: 8, tipo: 'CEMAR' },
  { id: 9, tipo: 'Visitante' },
  { id: 10, tipo: 'Administração' },
  { id: 11, tipo: 'Prestador - Ar Condicionado' },
  { id: 12, tipo: 'Prestador - Eletricista ' },
  { id: 13, tipo: 'Prestador - Encanador' },
  { id: 14, tipo: 'Prestador - Pedreiro' },
  { id: 15, tipo: 'Prestador - Pintor' },
];


const styles = theme => ({
  item: {
    marginBottom: '-15px',
  },

});

class RadioButton extends PureComponent {
  state = {
    value: 111,
    tipos: [],
  };

  handleChange = event => {
    const { value } = event.target;
    const { setTipo } = this.props;
    setTipo(value);
    this.setState({ value });
  };

  componentDidMount = async () => {
    const { dispatch } = this.props;
    const tipos = await listTipos(dispatch);
    // console.log(tipos);
    this.setState({ tipos });
  }


  clearRadioGroup = () => {
    this.setState({ value: 0 });
  };

  render() {
    const { classes } = this.props;
    const { value, tipos } = this.state;
    return (
      <Fragment>
        <div>Tipo</div>
        <FormControl component="fieldset">
          <RadioGroup
            aria-label="gender"
            name="gender1"
            value={value}
            onChange={this.handleChange}
          >
            {tipos.map((tipo) => (
              <FormControlLabel className={classes.item} key={tipo.id} value={String(tipo.id)} control={<Radio />} label={tipo.tipo} />
            ))}
          </RadioGroup>
        </FormControl>

      </Fragment>
    );
  }
}

RadioButton.propTypes = {
  classes: PropTypes.object.isRequired,
  setTipo: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default withStyles(styles)(RadioButton);
