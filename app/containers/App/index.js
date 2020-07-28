import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { isAuthenticated } from 'services/AuthService';
import NotFound from 'containers/Pages/Standalone/NotFoundDedicated';
import AppPublic from './Public';
import AppPrivate from './Private';
import ThemeWrapper, { AppContext } from './ThemeWrapper';
window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;


const App = (props) => {
  const { dispatch } = props;
  return (
    <ThemeWrapper>
      <AppContext.Consumer>
        {(changeMode) => (
          <Switch>
            { isAuthenticated() ? <Route render={(props2) => <AppPrivate {...props2} dispatch={dispatch} changeMode={changeMode} />} /> : <Route component={AppPublic} /> }
            <Route component={NotFound} />
          </Switch>
        )}
      </AppContext.Consumer>
    </ThemeWrapper>
  );
};

export default connect(state => ({
  force: state,
  user: state.get('user')
}),)(App);
