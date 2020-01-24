import React from 'react';

interface IProps {
  className?: string;
  children: JSX.Element[] | JSX.Element
}

function Container ( props: IProps ) {
  return (
    <div className={ `container ${ props.className }` }>
      { props.children }
    </div>
  
  );
}

export default Container;
