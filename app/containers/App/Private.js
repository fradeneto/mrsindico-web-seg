import React from 'react';
import { PropTypes } from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import Dashboard from '../Templates/Dashboard';
import * as Pages from '../PagesPrivate/pageListAsync';

class PrivateRoutes extends React.Component {
  render() {
    const { changeMode, history } = this.props;
    return (
      <Dashboard history={history} changeMode={changeMode}>
        <Switch>
          <Route exact path="/" component={Pages.Home} />
          <Route exact path="/app" component={Pages.Home} />
          <Route path="/not-found" component={Pages.NotFoundDedicated} />
          <Route path="/error" component={Pages.Error} />
          <Route component={Pages.NotFound} />
        </Switch>
      </Dashboard>
    );
  }
}

PrivateRoutes.propTypes = {
  changeMode: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

export default PrivateRoutes;
