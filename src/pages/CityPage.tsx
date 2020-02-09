import React from 'react';
import { Link } from 'react-router-dom';
import Container from '../components/Container';

const CityPage = () => {
    return (
        <Container>
            <Link to='/loading'
                type="button"
                className="btn btn-warning btn-lg btn-block">
                Gdańsk
            </Link>
            <button disabled type="button" className="btn btn-warning btn-lg btn-block">Gdynia</button>
        </Container>
    );
};

export default CityPage;
