import React from 'react';
import { Switch, Route } from 'react-router';
import routes from './constants/routes';
import App from './containers/App';
import HomePage from './containers/HomePage';
import ScanPage from './containers/ScanPage';
import WinPage from './containers/WinPage';


export default () => (
  <App>
    <Switch>
    <Route exact path={routes.SCAN} component={ScanPage} />
    <Route exact path={routes.WIN} component={WinPage} />
    <Route path={routes.HOME} component={HomePage} />
    </Switch>
  </App>
);
