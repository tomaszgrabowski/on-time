import React from 'react';
import { Link } from 'react-router-dom';

interface IProps {
  name: string;
  link: string;
}

function BrandName ( props: IProps ) {
  return (
    <Link to={ props.link } className='navbar-brand'>{ props.name }</Link>
  );
}

export default BrandName;
