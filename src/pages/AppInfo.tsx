import React from 'react';
import Container from '../components/Container';
import { appName } from '../config';
import Logo from '../logo.png';

const AppInfo = () => {
  return (
    <Container className='text-center'>
      <img className='logo' src={ Logo } alt={ appName }/>
      <section>
        <h2>
          Aplikacja OnTime v0.1 (beta)
        </h2>
        <p>
          Drodzy użytkownicy!
        </p>
        <p>
          Oddaję w wasze ręce aplikację która ma za zadanie usprawnić niełatwą sztukę podróżowania
          komunikacją miejską w Gdańsku. Dołożyłem wszelkich starań, aby była ona niezawodna, przejżysta
          i prosta w codziennym użytkowaniu...
        </p>
        <p>
          Jej głównym założeniem jest dostarczenie Wam informacji o realnych czasach przyjazdu autobusu lub tramwaju,
          na który właśnie czekacie. Wraz z przejrzystą listą aktualnych opóźnień, możecie też zlokalizować pojazd za
          pomocą mapy.
        </p>
        <p>
          Dziękuję za korzystanie z OnTime i zachęcam do dzielenia się wrażeniami.
        </p>
      </section>
    </Container>
  );
};

export default AppInfo;
