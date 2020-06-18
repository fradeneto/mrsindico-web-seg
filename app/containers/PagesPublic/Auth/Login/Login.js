import React from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import brand from 'api/dummy/brand';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import mapToObject from 'utils/mapToObject';
import LoginForm from './LoginForm';
import styles from '../user-jss';

const Login = props => {
  const title = brand.title + ' - Login';
  const description = brand.desc;
  const { classes } = props;

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
          <LoginForm history={props.history} />
        </div>
      </div>
    </div>
  );
};

export default withStyles(styles)(Login);
/*
class Login extends React.Component {
  state = {
    valueForm: []
  }

  submitForm(values) {
    const { valueForm } = this.state;

    console.log("==================")
    console.log({ valueForm: values })
    console.log("==================")
    console.log(values.email)
    console.log("==================")

    setTimeout(() => {
      this.setState({ valueForm: values });
      console.log(`You submitted:\n\n${valueForm}`);
      //window.location.href = '/app';
    }, 500); // simulate server latency


  }

  render() {
    const title = brand.name + ' - Login';
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
          abcdef
          <div className={classes.userFormWrap}>
            <LoginForm onSubmit={(values) => this.submitForm(values)} />
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Login);
*/
