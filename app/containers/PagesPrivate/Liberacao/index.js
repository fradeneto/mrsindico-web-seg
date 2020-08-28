import React, { useRef } from 'react';
import { Helmet } from 'react-helmet';
import brand from 'api/dummy/brand';
import Chip from '@material-ui/core/Chip';
import {
  DataTable, AlertDlg, ModalWindow, PapperBlock,
  MsgSnackbar
} from 'components';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import { AddCircle, Fingerprint, Edit as EditIcon } from '@material-ui/icons';

import AddToPhotos from '@material-ui/icons/AddToPhotos';
import Button from '@material-ui/core/Button';
import CadastroDlg from 'components/CadastroDlg';
import { findLastIndex } from 'lodash';

import CopyToClipboard from 'react-copy-to-clipboard';

import LiberacaoUnidade from './LiberacaoUnidade';
import LiberacaoTipo from './LiberacaoTipo';

import { getCadastros, saveCadastro } from '../../../services/CadastroService';
import { novaLiberacao } from '../../../services/LiberacaoService';


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
  btnEdit: {
    margin: theme.spacing(0),
    paddingTop: 3,
    paddingBottom: 3,
    paddingLeft: 8,
    paddingRight: 8,
    color: '#000000'
  },
  btnBiometriaOn: {
    margin: theme.spacing(0),
    paddingTop: 3,
    paddingBottom: 3,
    paddingLeft: 0,
    paddingRight: 0,
    color: '#0066aa',
  },
  btnBiometriaOff: {
    margin: theme.spacing(0),
    paddingTop: 3,
    paddingBottom: 3,
    paddingLeft: 0,
    paddingRight: 0,
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
    classes, history, unidadeId, dispatch
  } = props;


  const [liberarCadastros, setLiberarCadastros] = React.useState([]);
  const [liberarUnidades, setLiberarUnidades] = React.useState([]);
  const [tipoLiberacao, setTipoLiberacao] = React.useState('');
  const [addError, setAddError] = React.useState('');
  const [openAdd, setOpenAdd] = React.useState(false);
  const [msgError, setMsgError] = React.useState('');
  const tableRef = React.createRef();
  const formLiberacaoTipoRef = useRef(null);

  const setTipo = async (id) => {
    setTipoLiberacao(id);
  };

  const handleLiberar = async () => {
    if (liberarCadastros.length <= 0) {
      setAddError('Você deve adicionar pelo menos 1 cadastro');
      return;
    }
    if (liberarUnidades.length <= 0) {
      setAddError('Você deve adicionar pelo menos 1 unidade ou empresa');
      return;
    }
    if (!tipoLiberacao) {
      setAddError('Você deve selecionar o tipo de liberação');
      return;
    }
    const resp = await novaLiberacao(dispatch, liberarCadastros, liberarUnidades, tipoLiberacao);
    if (resp.status === 200) {
      setAddError('');
      setLiberarCadastros([]);
      setLiberarUnidades([]);
      setTipoLiberacao('');
      if (formLiberacaoTipoRef.current) formLiberacaoTipoRef.current.clearRadioGroup();
    } else {
      setAddError(resp.data.error);
    }
    // setAddError('erro msg');
  };

  const handleDelete = async (id) => {
    setLiberarCadastros(liberarCadastros.filter(obj => (obj.id !== id)));
  };

  const handleDeleteUnidade = async (unidade) => {
    if (unidade.value === 99999) {
      setLiberarUnidades(liberarUnidades.filter(obj => (obj.empresa_id !== unidade.empresa_id)));
    } else {
      setLiberarUnidades(liberarUnidades.filter(obj => (obj.value !== unidade.value)));
    }
  };

  const addUnidade = async (unidade, liberadoPor) => {
    setLiberarUnidades([...liberarUnidades, { ...unidade, liberadoPor }]);
  };

  async function handleClickOpenAdd() {
    setOpenAdd(true);
  }

  function handleCloseAdd() {
    setOpenAdd(false);
    setMsgError('');
  }

  async function handleSalvarAdd(values, form) {
    const response = await saveCadastro(dispatch, values);
    if (tableRef.current) tableRef.current.onQueryChange();

    if (response.error && response.error.message) {
      setMsgError(response.error.message);
    }

    if (response.data) {
      const { id, nome } = response.data;
      setLiberarCadastros([...liberarCadastros, { id, nome }]);
      handleCloseAdd();
    }
    form.setSubmitting(false);
  }


  const cssTabela = {

  };

  const columns = [
    {
      title: 'Nome',
      field: 'nome',
      type: 'string',
      filterPlaceholder: 'Nome',
      cellStyle: { textAlign: 'left', minWidth: '300px' },
      render: rowData => (
        <React.Fragment>
          <Button size="small" onClick={() => (setLiberarCadastros([...liberarCadastros, rowData]))}>
            {rowData.nome}
          </Button>
        </React.Fragment>
      )
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
          <Button size="small" className={classes.btnEdit}>
            <EditIcon />
          </Button>
          <CopyToClipboard text={`ms91${rowData.id}`}>
            <Button size="small" className={classes.btnBiometriaOn}>
              <Fingerprint />
            </Button>
          </CopyToClipboard>
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
      <PapperBlock title="Liberação" desc="Emissão de ticket">

        <CadastroDlg
          open={openAdd}
          dialogTitle="Adicionar Cadastro"
          handleClose={handleCloseAdd}
          handleSalvar={handleSalvarAdd}
          msgError={msgError}
          dispatch={dispatch}
        />

        <div className={classes.container}>
          <div className={classes.divTable}>
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
                  icon: 'add',
                  tooltip: 'Adicionar Cadastro',
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
          </div>
          <div className={classes.divUnidade}>
            <LiberacaoUnidade addUnidade={addUnidade} />
            <div>&nbsp;</div>
            <div>
              {liberarUnidades.map((unidade) => (
                <Chip
                  key={unidade.label}
                  label={(unidade.label.length > 35) ? `${unidade.label.substring(0, 33)}...` : unidade.label}
                  onDelete={() => handleDeleteUnidade(unidade)}
                />
              ))}
            </div>
            <div>&nbsp;</div>
            <div>
              {liberarCadastros.map((cadastro) => (
                <div>
                  <Chip
                    key={cadastro.id}
                    label={(cadastro.nome.length > 35) ? `${cadastro.nome.substring(0, 33)}...` : cadastro.nome}
                    onDelete={() => handleDelete(cadastro.id)}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className={classes.divTipo}>

            <LiberacaoTipo ref={formLiberacaoTipoRef} setTipo={setTipo} dispatch={dispatch} />
            <div className={classes.divLiberar}>
              <Button size="large" onClick={handleLiberar} className={classes.btnAction} style={{ marginBottom: '10px' }}>
                <AddToPhotos />
                {' '}
              &nbsp;
              Liberar
              </Button>
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
        </div>


      </PapperBlock>
    </>
  );
};

export default withStyles(styles)(Liberacao);
