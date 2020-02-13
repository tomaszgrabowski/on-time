import React from 'react';

const LoadingSpinner = () => {
    return (
      <div className='text-center'>
          <h3>Pobieranie aktualnych danych...</h3>
          <div className="spinner-border text-warning" role="status">
              <span className="sr-only">Loading...</span>
          </div>
      </div>
    );
};

export default LoadingSpinner;
