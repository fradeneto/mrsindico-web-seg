import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { PapperBlock } from 'components';

const SessionData = props => {
  const { classes } = props;

  const [sData, setSData] = useState([]);
  const [rData, setRData] = useState([]);

  useEffect(() => {
    const loadValues = async () => {
      const token = await sessionStorage.getItem('token');
      const userId = await sessionStorage.getItem('userId');
      const userNome = await sessionStorage.getItem('userNome');
      const userTratamento = await sessionStorage.getItem('userTratamento');
      const userSexo = await sessionStorage.getItem('userSexo');
      const userAvatar = await sessionStorage.getItem('userAvatar');
      const sistema = await sessionStorage.getItem('sistema');

      setSData([
        { key: 'userId', value: userId },
        { key: 'userNome', value: userNome },
        { key: 'userTratamento', value: userTratamento },
        { key: 'userSexo', value: userSexo },
        { key: 'userAvatar', value: userAvatar },
        { key: 'Sistema', value: sistema },
        { key: 'Token', value: token },
      ]);
    };
    loadValues();
  }, []);

  useEffect(() => {
    const loadValues = async () => {
      setRData([
        { key: 'KEY', value: 'value' },
      ]);
    };
    loadValues();
  }, []);

  return (
    <PapperBlock title="Dados da Seção" desc="Some text description">
      <div className={classes.container}>

        <div>
          <strong>sessionStorage:</strong>
          <ul>
            {sData.map(item => (<li>{`${item.key}: ${item.value}`}</li>))}
          </ul>
        </div>
        <div style={{ width: 100 }}>&nbsp;</div>
        <div>
          <strong>Redux:</strong>
          <ul>
            {rData.map(item => (<li>{`${item.key}: ${item.value}`}</li>))}
          </ul>
        </div>

      </div>
    </PapperBlock>

  );
};

const styles = {
  container: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between'
  }
};

export default withStyles(styles)(SessionData);
