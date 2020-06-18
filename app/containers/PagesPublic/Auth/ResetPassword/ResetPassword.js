import React from "react";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import brand from "api/dummy/brand";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import ResetForm from "./ResetForm";
import styles from "../user-jss";
import mapToObject from "utils/mapToObject";

const ResetPassword = props => {
  const title = brand.title;
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
          <ResetForm history={props.history} recoverCode={props.match.params.recoverCode} />
        </div>
      </div>
    </div>
  );
};

export default withStyles(styles)(ResetPassword);
