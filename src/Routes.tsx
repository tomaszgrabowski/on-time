import { ICommonStop } from './../backend/Common.interfaces';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CityPage from './pages/CityPage';
import Header, { INavRoute } from './components/Navigation/Header';
import AppInfo from './pages/AppInfo';
import Author from './pages/Author';
import BusStop from './pages/BusStop';
import LoadingPage from './pages/LoadingPage';
import MapPage from './pages/MapPage';
import StopsList from './pages/StopsList';
import { DataContext } from './Shared/DataContext';

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

export const appName: string = "przystanek.online";

const Routes = () => {
    const [stopData, setStopData] = useState<ICommonStop[]>( [] );
    const [currentStopData, setCurrentStopData] = useState<ICommonStop>( {} as ICommonStop );
    
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
                  <Route path='/' component={ CityPage } exact/>
                  <Route path='/loading/:city' component={ LoadingPage }/>
                  <Route path='/appinfo' component={ AppInfo }/>
                  <Route path='/author' component={ Author }/>
                  <Route path='/stopsList/:city' component={ StopsList }/>
                  <Route path='/busStop/:city/:busStopId' component={ BusStop } exact/>
                  <Route path='/mapPage/:city/:busStopId/:vehicleId' component={ MapPage } exact/>
              </Switch>
          </Router>
      </DataContext.Provider>
    );
};

export default Routes;
