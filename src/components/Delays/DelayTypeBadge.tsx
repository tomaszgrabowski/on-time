import React from 'react';
import { DelayType } from '../../Shared/DelayType';

interface IProps {
  type: DelayType
}

const DelayTypeBadge = ( props: IProps ) => {
  let badgeClass = 'badge-success';
  if ( props.type === DelayType.Delay ) {
    badgeClass = 'badge-warning';
  }
  if ( props.type === DelayType.Haste ) {
    badgeClass = 'badge-danger';
  }
  return (
    <span className={ `badge ${ badgeClass }` }>{ props.type }</span>
  );
};

export default DelayTypeBadge;
