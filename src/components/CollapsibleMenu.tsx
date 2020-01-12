import React from 'react';
import { NavLink } from 'react-router-dom';
import { INavRoute } from './Header';

interface IProps {
  targetId: string
  menuItems: INavRoute[];
}

function CollapsibleMenu ( props: IProps ) {
  return (
    <div className="collapse navbar-collapse" id={ props.targetId }>
      <div className="navbar-nav">
        { props.menuItems.map( ( item: INavRoute ) => (
          <NavLink
            key={ item.displayName }
            className='nav-item nav-link'
            activeClassName='active'
            to={ item.path }>
            { item.displayName }
          </NavLink>
        ) ) }
      </div>
    </div>
  );
}

export default CollapsibleMenu;
