import React, { useState } from 'react';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { PapperBlock } from 'components';

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Home from '@material-ui/icons/Home';
import PeopleAlt from '@material-ui/icons/PeopleAlt';
import DirectionsCar from '@material-ui/icons/DirectionsCar';
import AssignmentInd from '@material-ui/icons/AssignmentInd';

import UnidadeMoradores from './UnidadeMoradores';
import UnidadeVisitantes from './UnidadeVisitantes';
import UnidadePrestadores from './UnidadePrestadores';
import UnidadeVeiculos from './UnidadeVeiculos';

const Unidade = props => {
  const [value, setValue] = useState(0);
  const { classes } = props;
  const { id } = props.match.params;

  const handleChange = (event, vlr) => {
    setValue(vlr);
  };

  return (
    <PapperBlock title={`Unidade ${id}`} desc="" icon="md-home">
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Tabs
            value={value}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="on"
            indicatorColor="primary"
            textColor="secondary"
          >
            <Tab label="Dados da Unidade" icon={<Home />} />
            <Tab label="Moradores" icon={<PeopleAlt />} />
            <Tab label="Visitantes" icon={<PeopleAlt />} />
            <Tab label="Prestadores" icon={<AssignmentInd />} />
            <Tab label="Veículos" icon={<DirectionsCar />} />
          </Tabs>
        </AppBar>
        {value === 0 && <div>Item One</div>}
        {value === 1 && <UnidadeMoradores unidadeId={id} />}
        {value === 2 && <UnidadeVisitantes unidadeId={id} />}
        {value === 3 && <UnidadePrestadores unidadeId={id} />}
        {value === 4 && <UnidadeVeiculos unidadeId={id} />}
      </div>
    </PapperBlock>
  );
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
});

export default withStyles(styles)(Unidade);
