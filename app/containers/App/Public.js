import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Outer from '../Templates/Outer';
import {
  Login,
  Register,
  RecoverPassword,
  ResetPassword,
  NotFound,
} from '../PagesPublic/pageListAsync';

class PublicRoutes extends React.Component {
  render() {
    return (
      <Outer>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/recover-password" component={RecoverPassword} />
          <Route path="/reset-password/:recoverCode" component={ResetPassword} />
          <Route path="/" component={Login} />
          <Route component={NotFound} />
        </Switch>
      </Outer>
    );
  }
}

export default PublicRoutes;
