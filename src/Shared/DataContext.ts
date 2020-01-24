import React from 'react';
import { IGpsData } from './IGpsData';
import { IStop } from './IStops';

export const DataContext = React.createContext({
  gpsData: [] as IGpsData[],
  setGpsData : (data: IGpsData[]) => {},
  stopData: [] as IStop[],
  setStopData: (data: IStop[]) => {}
});
