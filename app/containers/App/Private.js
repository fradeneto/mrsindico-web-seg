import React from 'react';
import { PropTypes } from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import Dashboard from '../Templates/Dashboard';
import * as Pages from '../PagesPrivate/pageListAsync';

class PrivateRoutes extends React.Component {
  render() {
    const { changeMode, history, dispatch } = this.props;

    return (
      <Dashboard history={history} changeMode={changeMode} dispatch={dispatch}>
        <Switch>
          <Route exact path="/" component={Pages.Home} />
          <Route exact path="/home" component={Pages.Home} />
          <Route exact path="/cadastros">
            <Pages.Cadastros dispatch={dispatch} />
          </Route>
          <Route exact path="/liberacao">
            <Pages.Liberacao dispatch={dispatch} />
          </Route>
          <Route exact path="/ticket">
            <Pages.Ticket dispatch={dispatch} />
          </Route>
          <Route exact path="/liberacoes">
            <Pages.Liberacoes dispatch={dispatch} />
          </Route>
          <Route exact path="/veiculos">
            <Pages.Veiculos dispatch={dispatch} />
          </Route>
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
  dispatch: PropTypes.func.isRequired,
};

export default PrivateRoutes;
