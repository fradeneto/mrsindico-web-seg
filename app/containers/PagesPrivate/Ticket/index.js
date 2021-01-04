import React, { useRef, useState } from 'react';
import Input from '@material-ui/core/Input';
import { Helmet } from 'react-helmet';
import brand from 'api/dummy/brand';
import Chip from '@material-ui/core/Chip';
import {
  DataTable, PapperBlock,
  MsgSnackbar
} from 'components';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';

import moment from 'moment';
import { getTicket, liberarTicket } from '../../../services/TicketService';


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

const Ticket = props => {
  const {
    classes, history, dispatch
  } = props;

  const [msgError, setMsgError] = useState('');
  const [msgLiberado, setMsgLiberado] = useState(false);
  const [ticketId, setTicketId] = useState('');
  const [ticketObj, setTicketObj] = useState({});

  const consultarTicket = async () => {
    if (ticketId) {
      const response = await getTicket(dispatch, ticketId);
      if (response.status === 400) {
        setMsgError('Código inválido');
      } else if (response.status === 404) {
        setMsgError('Código inválido');
      } else if (response.status === 200) {
        setTicketObj(response.data.data);
      }
      setTicketId('');
      setMsgLiberado(false);
    }
  };

  const autorizarTicket = async () => {
    const response = await liberarTicket(dispatch, ticketObj.qrcode);
    if (response.status === 200) {
      setMsgLiberado(true);
    } else {
      setMsgError('Ocorreu um erro');
    }
  };

  return (
    <>
      <PapperBlock title="Ticket" desc="Consulta de Ticket">
        <div>
          <Input
            placeholder="Código do Ticket"
            value={ticketId}
            onChange={e => setTicketId(e.target.value)}
          />
          &nbsp; &nbsp;
          <Button onClick={consultarTicket} style={{ paddingLeft: 20, paddingRight: 20 }}>Consultar</Button>
        </div>
        <div>&nbsp;</div>
        {msgError && (
          <MsgSnackbar
            variant="error"
            message={msgError}
            onClose={() => {
              setMsgError('');
            }}
          />
        )}
        {msgLiberado && (
          <MsgSnackbar
            variant="success"
            message="Ticket Autorizado"
            onClose={() => {
              setMsgLiberado(false);
            }}
          />
        )}
        <div>&nbsp;</div>
        <table style={{ border: 0, margin: 0 }}>
          <tbody>
            <tr>
              <td style={{ width: '200px' }}>Nome:</td>
              <td>{ticketObj.cadastro_nome}</td>
            </tr>
            <tr>
              <td>Unidade:</td>
              <td>
                {ticketObj && ticketObj.unidades && ticketObj.unidades.map(unidade => (
                  <span key={unidade.id}>{`${unidade.grupo} / ${unidade.nome} |`}</span>
                ))}

              </td>
            </tr>
            <tr>
              <td>Local</td>
              <td>{ticketObj.local}</td>
            </tr>
            <tr>
              <td>Tipo</td>
              <td>{ticketObj.tipo}</td>
            </tr>
            <tr>
              <td>Entradas</td>
              <td>{ticketObj.id && (`${ticketObj.entradas} / ${ticketObj.qtde_entrada}`)}</td>
            </tr>
            <tr>
              <td>Data Aut.:</td>
              <td>{ticketObj.cadastro_nome}</td>
            </tr>
            <tr>
              <td>Liberado por:</td>
              <td>{ticketObj.liberadopor}</td>
            </tr>
            <tr>
              <td style={{ height: '60px', display: 'flex', alignItems: 'center' }}>Anunciado:</td>
              <td style={{ alignItems: 'center' }}>
                {ticketObj.id && (ticketObj.anunciado ? 'Sim' : (
                  <>
                    Não
                    &nbsp; &nbsp;
                    <Button onClick={autorizarTicket} style={{ paddingLeft: 20, paddingRight: 20 }}>Autorizar</Button>
                  </>
                ))}
              </td>
            </tr>

          </tbody>
        </table>
      </PapperBlock>
    </>
  );
};

export default withStyles(styles)(Ticket);
