import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header, { INavRoute } from './components/Header';
import { appName } from './config';
import BusStop from './pages/BusStop';
import InfoPage from './pages/InfoPage';
import LoadingPage from './pages/LoadingPage';
import MapPage from './pages/MapPage';
import StopsList from './pages/StopsList';
import { DataContext } from './Shared/DataContext';
import { IGpsData } from './Shared/IGpsData';
import { IStop } from './Shared/IStops';

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
  const [gpsData, setGpsData] = useState<IGpsData[]>( [] );
  const [stopData, setStopData] = useState<IStop[]>( [] );
  
  return (
    <DataContext.Provider value={ {
      gpsData: gpsData,
      setGpsData,
      stopData: stopData,
      setStopData
    } }>
      <Router>
        <Header appName={ appName } menuItems={ navRoutes }/>
        <Switch>
          <Route path='/' component={ LoadingPage } exact/>
          <Route path='/info' component={ InfoPage }/>
          <Route path='/stopsList' component={ StopsList }/>
          <Route path='/busStop/:busStopId' component={ BusStop } exact/>
          <Route path='/mapPage/:busStopId/:vehicleId' component={ MapPage } exact/>
        </Switch>
      </Router>
    </DataContext.Provider>
  
  );
};

export default Routes;
