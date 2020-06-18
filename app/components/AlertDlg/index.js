import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';


import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const styles = theme => ({
  padrao: {
    //color: theme.primary
  },
  alert: {
    color: '#AA0000',
  },
  divider: {
    margin: `${theme.spacing(3)}px 0`,
  },
  field: {
    margin: `${theme.spacing(3)}px 5px`,
  },
  button: {
    margin: theme.spacing(1),
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
    fontSize: 10,
    margin: -3,
    color: '#AA0000'
  }
});

const AlertDlg = (props) => {

  const {
    classes,
    handleCallback,
    disableBackdropClick = false,
    callbackColor = 'default',
    open, 
    handleClose, 
    captionClose = 'Cancelar', 
    captionCallback = 'Sim',
    dialogTitle = '', 
    dialogMessage = '' 
  } = props;

  return (
    <Dialog
      disableBackdropClick={disableBackdropClick}
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        { dialogTitle }
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          { dialogMessage }
          </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          { captionClose }
          </Button>
        <Button onClick={handleCallback} className={classNames(classes[callbackColor])} autoFocus>
          { captionCallback }
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default withStyles(styles)(AlertDlg);
