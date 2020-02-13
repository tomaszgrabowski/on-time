import React, { FC } from 'react';
import { AlertLevel } from '../../Shared/AlertLevel';
import Alert from '../Alert';
import LoadingSpinner from './LoadingSpinner';

interface IProps {
    loading: boolean;
    error: boolean;
}

const loadingErrorMessage = 'Mamy aktualnie problem z pozyskaniem danych od ZTM Gdańsk. Prosimy spróbuj ponownie za kilka minut...';

const WithLoading =
  <P extends object> ( Component: React.ComponentType<P> ): FC<P & IProps> =>
    ( { loading, error, ...props } ) => (
      <div>
          {
              error ?
                <Alert level={AlertLevel.Danger} message={ loadingErrorMessage }/>
                :
                loading ?
                  <LoadingSpinner/>
                  :
                  <Component { ...props as P } />
          }
      </div>
    
    );

export default WithLoading;
