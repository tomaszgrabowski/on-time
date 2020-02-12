import React from 'react';

interface IProps {
    message: string
}

const ErrorAlert = (props: IProps) => {
    return (
      <div className="alert alert-danger" role="alert">
          <h4 className="alert-heading">Nieoczekiwany błąd!</h4>
          <p>{props.message}</p>
      </div>
    );
};

export default ErrorAlert;
