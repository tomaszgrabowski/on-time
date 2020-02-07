import React from 'react';

interface IProps {
  targetId: string;
}

function TogglerButton ( props: IProps ) {
  return (
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target={ `#${ props.targetId }` }
            aria-controls={ props.targetId } aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon">
          </span>
    </button>
  );
}

export default TogglerButton;
