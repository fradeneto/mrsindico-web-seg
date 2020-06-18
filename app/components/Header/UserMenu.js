import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Info from '@material-ui/icons/Info';
import Warning from '@material-ui/icons/Warning';
import Check from '@material-ui/icons/CheckCircle';
import Error from '@material-ui/icons/RemoveCircle';
import ExitToApp from '@material-ui/icons/ExitToApp';
import Badge from '@material-ui/core/Badge';
import Divider from '@material-ui/core/Divider';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Ionicon from 'react-ionicons';
import dummy from 'api/dummy/dummyContents';
import messageStyles from 'styles/Messages.scss';
import avatarApi from 'api/images/avatars';
import link from 'api/ui/link';
import styles from './header-jss';

import { logout } from '../../services/AuthService';

class UserMenu extends React.Component {
  state = {
    anchorEl: null,
    openMenu: null,
    sistema: 'asd',
    nome: '',
    avatar: null
  };

  async componentDidMount() {
    const storagedSistema = sessionStorage.getItem('sistema');
    const avatarUrl = await sessionStorage.getItem('userAvatar');
    const userNome = await sessionStorage.getItem('userNome');
    if (avatarUrl !== 'null') {
      this.setState({ sistema: storagedSistema, avatar: avatarUrl, nome: userNome });
    } else {
      this.setState({ sistema: storagedSistema, avatar: '', nome: userNome });
    }
  }

  handleMenu = menu => (event) => {
    const { openMenu } = this.state;
    this.setState({
      openMenu: openMenu === menu ? null : menu,
      anchorEl: event.currentTarget
    });
  };

  handleClose = () => {
    this.setState({ anchorEl: null, openMenu: null });
  };

  handleLogout = async () => {
    this.setState({ anchorEl: null, openMenu: null });
    await logout(this.props.dispatch);
  }

  render() {
    const { classes, dark } = this.props;
    const {
      anchorEl, openMenu, sistema, nome, avatar
    } = this.state;
    return (
      <div>
        { /*
        <IconButton
          aria-haspopup="true"
          onClick={this.handleMenu('notification')}
          color="inherit"
          className={classNames(classes.notifIcon, dark ? classes.dark : classes.light)}
        >
          <Badge className={classes.badge} badgeContent={4} color="secondary">
            <Ionicon icon="ios-notifications-outline" />
          </Badge>
        </IconButton>
        */ }
        <Menu
          id="menu-notification"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          className={classes.notifMenu}
          PaperProps={{
            style: {
              width: 350,
            },
          }}
          open={openMenu === 'notification'}
          onClose={this.handleClose}
        >
          <MenuItem onClick={this.handleClose}>
            <div className={messageStyles.messageInfo}>
              <ListItemAvatar>
                <Avatar alt="User Name" src={avatarApi[0]} />
              </ListItemAvatar>
              <ListItemText primary={dummy.text.subtitle} secondary={dummy.text.date} />
            </div>
          </MenuItem>
          <Divider variant="inset" />
          <MenuItem onClick={this.handleClose}>
            <div className={messageStyles.messageInfo}>
              <ListItemAvatar>
                <Avatar className={messageStyles.icon}>
                  <Info />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={dummy.text.sentences} className={classes.textNotif} secondary={dummy.text.date} />
            </div>
          </MenuItem>
          <Divider variant="inset" />
          <MenuItem onClick={this.handleClose}>
            <div className={messageStyles.messageSuccess}>
              <ListItemAvatar>
                <Avatar className={messageStyles.icon}>
                  <Check />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={dummy.text.subtitle} className={classes.textNotif} secondary={dummy.text.date} />
            </div>
          </MenuItem>
          <Divider variant="inset" />
          <MenuItem onClick={this.handleClose}>
            <div className={messageStyles.messageWarning}>
              <ListItemAvatar>
                <Avatar className={messageStyles.icon}>
                  <Warning />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={dummy.text.subtitle} className={classes.textNotif} secondary={dummy.text.date} />
            </div>
          </MenuItem>
          <Divider variant="inset" />
          <MenuItem onClick={this.handleClose}>
            <div className={messageStyles.messageError}>
              <ListItemAvatar>
                <Avatar className={messageStyles.icon}>
                  <Error />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Suspendisse pharetra pulvinar sollicitudin. Aenean ut orci eu odio cursus lobortis eget tempus velit. " className={classes.textNotif} secondary="Jan 9, 2016" />
            </div>
          </MenuItem>
        </Menu>
        <Button onClick={this.handleMenu('user-setting')}>
          <Avatar
            alt={nome}
            src={avatar}
          />
        </Button>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={openMenu === 'user-setting'}
          onClose={this.handleClose}
        >
          <MenuItem onClick={this.handleClose} component={Link} to="/profile">Meu Perfil</MenuItem>
          { /* <MenuItem onClick={this.handleClose} component={Link} to={link.calendar}>My Calendar</MenuItem> */ }
          { /* <MenuItem onClick={this.handleClose} component={Link} to={link.email}>
            My Inbox
            <ListItemIcon>
              <Badge className={classNames(classes.badge, classes.badgeMenu)} badgeContent={2} color="secondary">&nbsp;</Badge>
            </ListItemIcon>
          </MenuItem> */ }
          <Divider />
          <MenuItem onClick={this.handleLogout} component={Link} to="/">
            <ListItemIcon>
              <ExitToApp />
            </ListItemIcon>
            Log Out
          </MenuItem>
        </Menu>
      </div>
    );
  }
}

UserMenu.propTypes = {
  classes: PropTypes.object.isRequired,
  dark: PropTypes.bool,
};

UserMenu.defaultProps = {
  dark: false
};

const UserMenuInit = connect(
  state => ({
    force: state,
    // initialValues: state.getIn([reducerLogin, 'usersLogin']),
    // deco: state.getIn([reducerUi, 'decoration'])
  }),
)(UserMenu);

export default withStyles(styles)(UserMenuInit);
