import React, { useRef } from 'react';
import {
  DataTable, PapperBlock,
} from 'components';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import { Ballot as VinculoIcon } from '@material-ui/icons';
import moment from 'moment';
import { getVeiculos } from '../../../services/VeiculoService';


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

const Veiculo = props => {
  const {
    classes, history, dispatch
  } = props;


  const tableRef = React.createRef();

  const cssTabela = {

  };

  const columns = [
    {
      title: 'Marca',
      field: 'modelo.marca.marca',
      type: 'string',
      filterPlaceholder: 'Marca',
    },
    {
      title: 'Modelo',
      field: 'modelo.modelo',
      type: 'string',
      filterPlaceholder: 'Modelo',
    },
    {
      title: 'Torre',
      field: 'unidade.grupo.nome_resumido',
      type: 'string',
      filterPlaceholder: 'Torre',
    },
    {
      title: 'Apto',
      field: 'unidade.nome',
      type: 'string',
      filterPlaceholder: 'Apto',
    },
    {
      title: 'Placa',
      field: 'placa',
      type: 'string',
      filterPlaceholder: 'Placa',
    },
    {
      title: 'Cor',
      field: 'cor.nome',
      type: 'string',
      filterPlaceholder: 'Cor',
    },
    {
      title: 'Ano',
      field: 'ano_modelo',
      type: 'string',
      filterPlaceholder: 'Ano',
    },
    /* {
      title: 'Ações',
      cellStyle: { textAlign: 'center' },
      headerStyle: { textAlign: 'center' },
      render: rowData => (
        <React.Fragment>
          <Button color="primary" size="small" onClick={() => (handleClickOpenVinculos(rowData.id, rowData.nome))} className={classes.btnVinculo}>
            <VinculoIcon />
          </Button>
        </React.Fragment>
      )
    } */
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
      <PapperBlock title="Veículos" desc="Lista de cadastros">
        <DataTable
          tableRef={tableRef}
          options={options}
          style={cssTabela}
          title="Veiculos"
          columns={columns}
          data={query => new Promise((resolve, reject) => {
            getVeiculos(dispatch, query).then(result => {
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

export default withStyles(styles)(Veiculo);
