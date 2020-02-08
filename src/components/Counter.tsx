import React from 'react';

interface IProps {
  message: string;
  guestsNumber: number;
}

const NavbarCounter: React.FC<IProps> = ( props: IProps ) => {
  return (
    <div className='float-right d-none d-lg-block'>
      {props.message}: { props.guestsNumber }
    </div>
  );
}

export default NavbarCounter;
