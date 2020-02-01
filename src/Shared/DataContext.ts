import React from 'react';
import { IGpsData } from './IGpsData';
import { IStop } from './IStops';

export const DataContext = React.createContext({
  stopData: [] as IStop[],
  setStopData: (data: IStop[]) => {},
  currentStopData: {} as IStop,
  setCurrentStopData: (data: IStop) => {}
});
