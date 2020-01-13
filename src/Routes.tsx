import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header, { INavRoute } from './components/Header';
import BusStopByNumberPage from './pages/BusStopByNumberPage';

const navRoutes: INavRoute[] = [
  {
    displayName: 'Po numerze przystanku',
    path: '/'
  },
  {
    displayName: 'Na mapie',
    path: '/'
  }
];

const Routes = () => {
  return (
    <Router>
      <Header appName="OnTimer" menuItems={ navRoutes }/>
      <Switch>
        <Route path='/' component={ BusStopByNumberPage } exact/>
      </Switch>
    </Router>
  );
};

export default Routes;
