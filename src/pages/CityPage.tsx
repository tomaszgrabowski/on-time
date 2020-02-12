import React from 'react';
import { Link } from 'react-router-dom';
import Container from '../components/Container';

const CityPage = () => {
    return (
        <Container>
            <Link to={`/loading/gdansk`}
                type="button"
                className="btn btn-warning btn-lg btn-block">
                Gdańsk
            </Link>
          <Link to={`/loading/gdynia`}
                type="button"
                className="btn btn-warning btn-lg btn-block">
              Gdynia
          </Link>
        </Container>
    );
};

export default CityPage;
