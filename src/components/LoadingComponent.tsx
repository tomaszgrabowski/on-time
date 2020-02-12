import React from 'react';
import WithLoading from './WithLoading';

const LoadingComponent = () => {
    return (
      <div>
          Dane zostały pobrane...
      </div>
    );
};

export default WithLoading( LoadingComponent );
