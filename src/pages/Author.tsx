import React from 'react';
import { appName } from '../Routes';
import Container from '../components/Container';

import Logo from '../logo.png';

const Author = () => {
  return (
    <Container className='text-center'>
      <img className='logo' src={ Logo } alt={ appName }/>
      <section>
        <h2>
          Tomasz Grabowski
        </h2>
        <p>
          <a href='https://tomaszgrabowski.github.io/' target='_blank'>https://tomaszgrabowski.github.io</a>
        </p>
        <p>
          <a href='https://github.com/tomaszgrabowski/' target='_blank'>hhttps://github.com/tomaszgrabowski/</a>
        </p>
        <p>
          <a href='https://pl.linkedin.com/in/tomasz-grabowski-47291257' target='_blank'>https://pl.linkedin.com/in/tomasz-grabowski-47291257</a>
        </p>
      </section>
    </Container>
  );
};

export default Author;
