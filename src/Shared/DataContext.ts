import React from 'react';
import { ICommonStop } from '../Shared/ICommonStop';

export const DataContext = React.createContext({
  stopData: [] as ICommonStop[],
  setStopData: (data: ICommonStop[]) => {},
});
