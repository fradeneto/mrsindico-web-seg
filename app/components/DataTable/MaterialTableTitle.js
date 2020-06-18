import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
//import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Ionicon from 'react-ionicons';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import styles from './datatableStyle-jss';

class MaterialTableTitle extends React.Component {
  render() {
    const {
      classes,
      title,
      icon
    } = this.props;
    return (
      <div style={{marginBottom: 0,}}>
          <div className={classes.descBlock}>
            <span className={classes.iconTitle}>
              <Ionicon icon={icon} />
            </span>
            <div className={classes.titleText}>
              <Typography variant="h6" component="h2" className={classes.title}>
                {title}
              </Typography>
            </div>
          </div>
      </div>
    );
  }
}

MaterialTableTitle.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
  whiteBg: PropTypes.bool,
  colorMode: PropTypes.bool,
  noMargin: PropTypes.bool,
  overflowX: PropTypes.bool,
};

MaterialTableTitle.defaultProps = {
  whiteBg: false,
  noMargin: false,
  colorMode: false,
  overflowX: false,
  icon: 'ios-bookmark-outline'
};

export default compose(withStyles(styles))(MaterialTableTitle);
