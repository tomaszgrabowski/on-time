import React, { useState } from 'react';
import Container from '../components/Container';
import DelaysList from '../components/DelaysList';
import { DUMMY_DATA } from '../DUMMY_DATA';

const BusStopByNumberPage = () => {
  const [busStopNumber, setBusStopNumber] = useState( '' );
  const [delays, setDelays] = useState( DUMMY_DATA );
  const [error, setError] = useState( '' );
  
  const onChangeHandler = ( e: React.ChangeEvent<HTMLInputElement> ) => {
    setBusStopNumber( e.target.value );
  };
  const onSubmitHandler = async ( e: React.FormEvent<HTMLFormElement> ) => {
    e.preventDefault();
    const url = `http://ckan2.multimediagdansk.pl/delays?stopId=${ busStopNumber }`;
    try {
      const rawData = await fetch( url );
      const { delay } = await rawData.json();
      setDelays( delay );
      setError('')
    } catch ( e ) {
      setDelays( [] );
      setError( e.message );
    }
  };
  return (
    <Container>
      { error && <div className="alert alert-warning" role="alert">
        Sprawdz poprawność wpisanych danych...
      </div> }
      <h4>Podaj numer przystanku.</h4>
      <form onSubmit={ onSubmitHandler }>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Numer przystanku</label>
          <input type='text' name='bus-number' className='form-control' onChange={ onChangeHandler }/>
        </div>
        <button className='btn btn-primary'>Szukaj</button>
      </form>
      <hr/>
      { delays && <DelaysList delays={ delays }/> }
    </Container>
  );
};

export default BusStopByNumberPage;
