import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import moment from 'moment';
import MomentUtils from '@date-io/moment';
import 'moment/locale/pt-br';
import styles from './cadastrodlg-jss';

moment.locale('pt-br');

const CadastroDlg = (props) => {
  const {
    classes,
    disableBackdropClick,
    open,
    handleClose,
    dialogTitle,
    maxWidth,
    vinculos
  } = props;

  return (
    <Dialog
      disableBackdropClick={disableBackdropClick}
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth={maxWidth}
    >
      <DialogTitle id="alert-dialog-title" style={{ marginBottom: 0 }}>
        { dialogTitle }
      </DialogTitle>
      <DialogContent>
        <Table className={classNames(classes.table, classes.stripped)}>
          <TableHead>
            <TableRow style={{ padding: 0, margin: 0 }}>
              <TableCell align="center">Vínculo</TableCell>
              <TableCell align="center">Unidade / Empresa</TableCell>
              <TableCell align="center">Cadastrado em</TableCell>
              <TableCell align="center">Valido até</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            { vinculos.morador && vinculos.morador.map(morador => (
              <TableRow key={morador.id} style={{ paddingTop: 5, paddingBottom: 5 }}>
                <TableCell align="center" style={{ paddingTop: 5, paddingBottom: 5 }}>Morador</TableCell>
                <TableCell align="center" style={{ paddingTop: 5, paddingBottom: 5 }}>{`T ${morador['unidade.grupo_id']} / AP ${morador['unidade.nome']}`}</TableCell>
                <TableCell align="center" style={{ paddingTop: 5, paddingBottom: 5 }}>{moment(morador.created_at).format('DD/MM/YYYY HH:mm:ss')}</TableCell>
                <TableCell align="center" style={{ paddingTop: 5, paddingBottom: 5 }}>{morador.validade ? moment(morador.validade).format('DD/MM/YYYY HH:mm:ss') : ''}</TableCell>
              </TableRow>
            ))}
            { vinculos.visitante && vinculos.visitante.map(visitante => (
              <TableRow key={visitante.id} style={{ paddingTop: 5, paddingBottom: 5 }}>
                <TableCell align="center" style={{ paddingTop: 5, paddingBottom: 5 }}>Visitante</TableCell>
                <TableCell align="center" style={{ paddingTop: 5, paddingBottom: 5 }}>{`T ${visitante['unidade.grupo_id']} / AP ${visitante['unidade.nome']}`}</TableCell>
                <TableCell align="center" style={{ paddingTop: 5, paddingBottom: 5 }}>{moment(visitante.created_at).format('DD/MM/YYYY HH:mm:ss')}</TableCell>
                <TableCell align="center" style={{ paddingTop: 5, paddingBottom: 5 }}>{visitante.validade ? moment(visitante.validade).format('DD/MM/YYYY HH:mm:ss') : ''}</TableCell>
              </TableRow>
            ))}
            { vinculos.prestador && vinculos.prestador.map(prestador => (
              <TableRow key={prestador.id} style={{ paddingTop: 5, paddingBottom: 5 }}>
                <TableCell align="center" style={{ paddingTop: 5, paddingBottom: 5 }}>Prestador</TableCell>
                <TableCell align="center" style={{ paddingTop: 5, paddingBottom: 5 }}>{`T ${prestador['unidade.grupo_id']} / AP ${prestador['unidade.nome']}`}</TableCell>
                <TableCell align="center" style={{ paddingTop: 5, paddingBottom: 5 }}>{moment(prestador.created_at).format('DD/MM/YYYY HH:mm:ss')}</TableCell>
                <TableCell align="center" style={{ paddingTop: 5, paddingBottom: 5 }}>{prestador.validade ? moment(prestador.validade).format('DD/MM/YYYY HH:mm:ss') : ''}</TableCell>
              </TableRow>
            ))}
            { vinculos.terceirizado && vinculos.terceirizado.map(terceirizado => (
              <TableRow key={terceirizado.id} style={{ paddingTop: 5, paddingBottom: 5 }}>
                <TableCell align="center" style={{ paddingTop: 5, paddingBottom: 5 }}>Terceirizado</TableCell>
                <TableCell align="center" style={{ paddingTop: 5, paddingBottom: 5 }}>{terceirizado['empresa.nome_fantasia']}</TableCell>
                <TableCell align="center" style={{ paddingTop: 5, paddingBottom: 5 }}>{moment(terceirizado.created_at).format('DD/MM/YYYY HH:mm:ss')}</TableCell>
                <TableCell align="center" style={{ paddingTop: 5, paddingBottom: 5 }}>{terceirizado.validade ? moment(terceirizado.validade).format('DD/MM/YYYY HH:mm:ss') : ''}</TableCell>
              </TableRow>
            ))}
            {/* compras.map(compra => (
              compra.tags.map(tag => (
                <TableRow key={tag.id} style={{ paddingTop: 5, paddingBottom: 5 }}>
                  <TableCell align="center" style={{ paddingTop: 5, paddingBottom: 5 }}>{compra.id}</TableCell>
                  <TableCell align="center" style={{ paddingTop: 5, paddingBottom: 5 }}>{moment(compra.created_at).format('DD/MM/YYYY HH:mm')}</TableCell>
                  <TableCell align="center" style={{ paddingTop: 5, paddingBottom: 5 }}>{tag.tagModelo.modelo}</TableCell>
                  <TableCell align="center" style={{ paddingTop: 5, paddingBottom: 5 }}>{tag.valor}</TableCell>
                  <TableCell align="center" style={{ paddingTop: 5, paddingBottom: 5 }}>{(compra.mp_data_pgto ? moment(compra.mp_data_pgto).format('DD/MM/YYYY HH:mm') : '')}</TableCell>
                </TableRow>
              ))
              )) */}


          </TableBody>
        </Table>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Fechar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

CadastroDlg.propTypes = {
  classes: PropTypes.object.isRequired,
  disableBackdropClick: PropTypes.bool,
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  dialogTitle: PropTypes.string,
  maxWidth: PropTypes.string,
  vinculos: PropTypes.object.isRequired
};

CadastroDlg.defaultProps = {
  disableBackdropClick: true,
  dialogTitle: '',
  maxWidth: 'md'
};

export default withStyles(styles)(CadastroDlg);
