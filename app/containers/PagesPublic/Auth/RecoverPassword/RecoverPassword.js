import React from 'react';
import { Helmet } from 'react-helmet';
import brand from 'api/dummy/brand';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import RecoverForm from './RecoverForm';
import styles from '../user-jss';

class RecoverPassword extends React.Component {

  render() {
    const title = brand.name + ' - Reset Password';
    const description = brand.desc;
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={description} />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <meta property="twitter:title" content={title} />
          <meta property="twitter:description" content={description} />
        </Helmet>
        <div className={classes.container}>
          <div className={classes.userFormWrap}>
            <RecoverForm />
          </div>
        </div>
      </div>
    );
  }
}

RecoverPassword.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RecoverPassword);
