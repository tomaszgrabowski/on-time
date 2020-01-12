import React from 'react';
import BrandName from './BrandName';
import CollapsibleMenu from './CollapsibleMenu';
import Container from './Container';
import TogglerButton from './TogglerButton';

export interface INavRoute {
  displayName: string;
  path: string
}

interface IProps {
  appName: string;
  menuItems: INavRoute[];
}

const Header: React.FC<IProps> = ( props: IProps ) => {
  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Container>
          <BrandName name={ props.appName } link='/'/>
          <TogglerButton targetId='navbarNavAltMarkup'/>
          <CollapsibleMenu targetId='navbarNavAltMarkup' menuItems={ props.menuItems }/>
        </Container>
      </nav>
    </header>
  );
};

export default Header;
