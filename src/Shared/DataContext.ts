import { ICommonStop } from './../../backend/Common.interfaces';
import React from 'react';

export const DataContext = React.createContext({
  stopData: [] as ICommonStop[],
  setStopData: (data: ICommonStop[]) => {},
  currentStopData: {} as ICommonStop,
  setCurrentStopData: (data: ICommonStop) => {}
});
