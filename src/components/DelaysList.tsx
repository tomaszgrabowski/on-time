import React from 'react';
import { IDelay } from '../Shared/IDelay';
import DelayListItem from './DelayListItem';

interface IProps {
  delays: IDelay[];
}

const DelaysList = ( props: IProps ) => {
  return (
    <ul className="list-group">
      { props.delays.map( ( delay: IDelay ) => <DelayListItem key={delay.trip} delay={ delay }/> ) }
    </ul>
  );
};

export default DelaysList;
