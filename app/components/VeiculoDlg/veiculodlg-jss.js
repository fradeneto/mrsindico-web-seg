
const styles = theme => ({
  demo: {
    height: '60px',
  },
  divider: {
    margin: '5px 0',
  },
  picker: {
    margin: '5px 5px',
  },
  divRow: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  divCol: {
    height: '80px',
    minWidth: '320px',
    // width: '320px',
    marginLeft: '5px',
    marginRight: '5px'
  },
  divCol3: {
    height: '80px',
    minWidth: '150px',
    marginLeft: '5px',
    marginRight: '5px'
  },

  padrao: {
    // color: theme.primary
  },
  alert: {
    color: '#AA0000',
  },
  divider: {
    margin: `${theme.spacing(0)}px 0`,
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

export default styles;
