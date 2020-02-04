import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header, { INavRoute } from './components/Navigation/Header';
import { appName } from './config';
import AppInfo from './pages/AppInfo';
import Author from './pages/Author';
import BusStop from './pages/BusStop';
import LoadingPage from './pages/LoadingPage';
import MapPage from './pages/MapPage';
import StopsList from './pages/StopsList';
import { DataContext } from './Shared/DataContext';
import { IStop } from './Shared/IStops';

const navRoutes: INavRoute[] = [
    {
        displayName: 'Szukaj',
        path: '/'
    },
    {
        displayName: 'Info',
        path: '/appinfo'
    },
    {
        displayName: 'Autor',
        path: '/Author'
    }
];
const Routes = () => {
    const [stopData, setStopData] = useState<IStop[]>( [] );
    const [currentStopData, setCurrentStopData] = useState<IStop>( {} as IStop );
    
    return (
      <DataContext.Provider value={ {
          stopData: stopData,
          setStopData,
          currentStopData: currentStopData,
          setCurrentStopData
      } }>
          <Router>
              <Header appName={ appName } menuItems={ navRoutes }/>
              <Switch>
                  <Route path='/' component={ LoadingPage } exact/>
                  <Route path='/appinfo' component={ AppInfo }/>
                  <Route path='/author' component={ Author }/>
                  <Route path='/stopsList' component={ StopsList }/>
                  <Route path='/busStop/:busStopId' component={ BusStop } exact/>
                  <Route path='/mapPage/:busStopId/:vehicleId' component={ MapPage } exact/>
              </Switch>
          </Router>
      </DataContext.Provider>
    );
};

export default Routes;
