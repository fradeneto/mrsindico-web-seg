import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { DataTable, AlertDlg, ModalWindow } from 'components';
import { savePrestador, deletePrestador } from 'services/PrestadorService';
import { getPrestadores } from 'services/UnidadeService';
import { DateTime, Settings } from 'luxon';
import DeleteIcon from '@material-ui/icons/Delete';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import Button from '@material-ui/core/Button';
import CadastroDlg from 'components/CadastroDlg';
import PrestadorHorarioDlg from 'components/PrestadorHorarioDlg';

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

const UnidadeVisitantes = props => {
  const { classes, history, unidadeId } = props;
  const [openDelete, setOpenDelete] = React.useState(false);
  const [openAdd, setOpenAdd] = React.useState(false);
  const [openHorario, setOpenHorario] = React.useState(false);
  const [dataDelete, setDataDelete] = React.useState({});
  const [msgError, setMsgError] = React.useState('');
  const [horarioId, setHorarioId] = React.useState(0);
  const tableRef = React.createRef();

  async function handleClickOpenDelete(rowData) {
    await setDataDelete(rowData);
    setOpenDelete(true);
  }

  function handleCloseDelete() {
    setOpenDelete(false);
  }

  async function handleDeleteDlgYes() {
    await deletePrestador(dataDelete.id);
    if (tableRef.current) tableRef.current.onQueryChange();
    setOpenDelete(false);
  }

  async function handleClickOpenAdd() {
    setOpenAdd(true);
  }

  function handleCloseAdd() {
    setOpenAdd(false);
    setMsgError('');
  }

  async function handleClickOpenHorario(rowData) {
    // console.log(rowData.id);
    await setHorarioId(rowData.id);
    setOpenHorario(true);
  }

  function handleCloseHorario() {
    setHorarioId(0);
    setOpenHorario(false);
  }

  async function handleSalvarAdd(values, form) {
    const visitante = {
      unidade_id: unidadeId,
      cadastro: values
    };
    const response = await savePrestador(visitante);
    if (tableRef.current) tableRef.current.onQueryChange();

    if (response.error && response.error.message) {
      setMsgError(response.error.message);
    }

    if (response.data) {
      handleCloseAdd();
    }
    form.setSubmitting(false);
  }

  const columns = [
    {
      title: 'Nome',
      field: 'cadastro.nome',
      type: 'string'
    },
    { title: 'Cadastrado em', field: 'created_at', render: rowData => (DateTime.fromISO(rowData.createdAt).toFormat('dd/MM/yyyy HH:mm:ss')) },
    {
      title: 'Ações',
      cellStyle: { width: '130px', textAlign: 'left' },
      render: rowData => (
        <React.Fragment>
          <Button size="small" onClick={() => (handleClickOpenHorario(rowData))} className={classes.btnAction}>
            <AccessTimeIcon />
            {' '}
&nbsp;Horário
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
        dialogMessage={`Você tem certeza que deseja excluir o morador ${(dataDelete.cadastro) ? dataDelete.cadastro.nome : ''}`}
      />

      <CadastroDlg
        open={openAdd}
        dialogTitle="Adicionar Morador"
        handleClose={handleCloseAdd}
        handleSalvar={handleSalvarAdd}
        msgError={msgError}
      />
      <PrestadorHorarioDlg
        open={openHorario}
        prestadorId={horarioId}
        handleClose={handleCloseHorario}
      />

      <DataTable
        tableRef={tableRef}
        options={options}
        style={cssTabela}
        title="Unidades"
        columns={columns}
        data={query => new Promise((resolve, reject) => {
          getPrestadores(unidadeId, query).then(result => {
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
            tooltip: 'Adicionar Prestador',
            isFreeAction: true,
            onClick: () => handleClickOpenAdd()
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


export default withStyles(styles)(UnidadeVisitantes);
