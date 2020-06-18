import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { DataTable, AlertDlg, ModalWindow } from 'components';
import { deleteVeiculo } from 'services/VeiculoService';
import { getVeiculos } from 'services/UnidadeService';
import { DateTime, Settings } from 'luxon';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import Button from '@material-ui/core/Button';
import VeiculoDlg from 'components/VeiculoDlg';

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
    paddingRight: 8
  },
  btnExcluir: {
    color: '#AA0000'
  }
});

const UnidadeVeiculos = props => {
  const { classes, history, unidadeId } = props;
  const [openDelete, setOpenDelete] = React.useState(false);
  const [openVeiculo, setOpenVeiculo] = React.useState(false);
  const [dataDelete, setDataDelete] = React.useState({});
  const [veiculoId, setVeiculoId] = React.useState(0);
  const tableRef = React.createRef();

  useEffect(() => {
    if (!openVeiculo) {
      if (tableRef.current) tableRef.current.onQueryChange();
    }
  }, [openVeiculo]);

  async function handleClickOpenDelete(rowData) {
    await setDataDelete(rowData);
    setOpenDelete(true);
  }

  function handleCloseDelete() {
    setOpenDelete(false);
  }

  async function handleDeleteDlgYes() {
    await deleteVeiculo(dataDelete.id);
    if (tableRef.current) tableRef.current.onQueryChange();
    setOpenDelete(false);
  }

  async function handleClickOpenVeiculo(rowData) {
    // console.log(rowData.id);
    if (rowData) {
      await setVeiculoId(rowData.id);
    }
    setOpenVeiculo(true);
  }

  function handleCloseVeiculo() {
    setVeiculoId(0);
    setOpenVeiculo(false);
  }

  const columns = [
    {
      title: 'Modelo',
      render: rowData => (rowData.modelo.marca.marca + ' ' + rowData.modelo.modelo)
    },
    {
      title: 'Placa',
      field: 'placa',
      type: 'string'
    },
    {
      title: 'Cor',
      field: 'cor.nome',
      type: 'string'
    },
    {
      title: 'TAG',
      field: 'tag_id',
      type: 'string'
    },
    {
      title: 'Ações',
      cellStyle: { minWidth: '300px', textAlign: 'left' },
      render: rowData => (
        <React.Fragment>
          <Button size="small" onClick={() => (handleClickOpenVeiculo(rowData))} className={classes.btnAction}>
            <EditIcon />
            {' '}
&nbsp;Editar
          </Button>
          <Button size="small" onClick={() => (handleClickOpenVeiculo(rowData))} className={classes.btnAction}>
            <LocalOfferIcon />
            {' '}
&nbsp;TAG
          </Button>
          <Button size="small" onClick={() => (handleClickOpenDelete(rowData))} className={classNames(classes.btnAction, classes.btnExcluir)}>
            <DeleteIcon />
            {' '}
Excluir
          </Button>
        </React.Fragment>
      )
    }
  ];

  const options = {
    maxBodyHeight: 400,
    search: false,
    pageSize: 10,
    filtering: false,
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
      <AlertDlg
        open={openDelete}
        handleCallback={handleDeleteDlgYes}
        captionCallback="sim"
        callbackColor="alert"
        handleClose={handleCloseDelete}
        dialogTitle="Você tem certeza que deseja excluir?"
        dialogMessage={`Você tem certeza que deseja excluir o veiculo ${(dataDelete.modelo) ? dataDelete.modelo.modelo : ''}`}
      />

      <VeiculoDlg
        open={openVeiculo}
        veiculoId={veiculoId}
        unidadeId={unidadeId}
        handleClose={handleCloseVeiculo}
      />

      <DataTable
        tableRef={tableRef}
        options={options}
        style={cssTabela}
        title="Unidades"
        columns={columns}
        data={query => new Promise((resolve, reject) => {
          getVeiculos(unidadeId, query).then(result => {
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
            icon: 'add',
            tooltip: 'Adicionar Veiculo',
            isFreeAction: true,
            onClick: () => handleClickOpenVeiculo()
          },
          {
            icon: 'refresh',
            tooltip: 'Recarregar',
            isFreeAction: true,
            onClick: () => tableRef.current && tableRef.current.onQueryChange()
          },

        ]}
      />
    </>
  );
};

const cssTabela = {

};


export default withStyles(styles)(UnidadeVeiculos);
