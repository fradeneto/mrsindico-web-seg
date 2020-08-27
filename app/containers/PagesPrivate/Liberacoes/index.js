import React, { useRef } from 'react';
import { Helmet } from 'react-helmet';
import brand from 'api/dummy/brand';
import Chip from '@material-ui/core/Chip';
import {
  DataTable, PapperBlock,
  MsgSnackbar
} from 'components';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import AddCircle from '@material-ui/icons/AddCircle';
import AddToPhotos from '@material-ui/icons/AddToPhotos';
import Button from '@material-ui/core/Button';

import { getCadastros } from '../../../services/CadastroService';


const styles = theme => ({
  demo: {
    height: 'auto',
  },
  divider: {
    margin: `${theme.spacing(3)}px 0`,
  },
  field: {
    margin: `${theme.spacing(3)}px 5px`,
  },
  button: {
    margin: theme.spacing(0),
  },
  inputUpload: {
    display: 'none',
  },
  leftIcon: {
    marginRight: theme.spacing(1),
  },
  rightIcon: {
    marginLeft: theme.spacing(1),
  },
  iconSmall: {
    fontSize: 20,
  },
  btnAction: {
    margin: theme.spacing(0),
    paddingTop: 3,
    paddingBottom: 3,
    paddingLeft: 8,
    paddingRight: 8,
    color: '#006600'
  },
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '10px'
  },
  divTable: {
    minWidth: '400px'
  },
  divUnidade: {
    width: '300px'
  },
  divTipo: {
    minWidth: '280px'
  },
  divLiberar: {
    marginTop: '15px',
  }
});

const Liberacao = props => {
  const {
    classes, history, dispatch
  } = props;

  const tableRef = React.createRef();

  const cssTabela = {

  };

  const columns = [
    {
      title: 'Nome',
      field: 'nome',
      type: 'string',
      filterPlaceholder: 'Nome',
      cellStyle: { textAlign: 'left', minWidth: '300px' },

    },
    {
      title: 'CPF',
      field: 'cpf',
      type: 'string',
      filterPlaceholder: 'CPF',
      cellStyle: { textAlign: 'center' },
      headerStyle: { textAlign: 'center' },
    },
    {
      title: 'Ações',
      cellStyle: { textAlign: 'center' },
      headerStyle: { textAlign: 'center' },
      render: rowData => (
        <React.Fragment>
          <Button size="small" onClick={() => alert('ok')} className={classes.btnAction}>
            <AddCircle />
            {' '}
            &nbsp;
            Add
          </Button>
        </React.Fragment>
      )
    }
  ];

  const options = {
    maxBodyHeight: 400,
    search: false,
    pageSize: 10,
    filtering: true,
    showTitle: false,
    toolbar: true,
    header: true,
    padding: 'dense',
    rowStyle: {},
    headerStyle: {
      marginTop: 0,
      paddingBottom: 0,
      paddingTop: 0,

    }
  };

  return (
    <>
      <PapperBlock title="Liberaçções" desc="Lista de liberações">
        <DataTable
          tableRef={tableRef}
          options={options}
          style={cssTabela}
          title="Unidades"
          columns={columns}
          data={query => new Promise((resolve, reject) => {
            getCadastros(dispatch, query).then(result => {
              resolve({
                data: result.data.data,
                page: result.data.page,
                totalCount: result.data.total
              });
            });
          })
          }
          editable={{}}
          actions={[
            {
              icon: 'refresh',
              tooltip: 'Recarregar',
              isFreeAction: true,
              onClick: () => tableRef.current && tableRef.current.onQueryChange()
            },

          ]}
        />


      </PapperBlock>
    </>
  );
};

export default withStyles(styles)(Liberacao);
