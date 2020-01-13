import React, { useState } from 'react';
import Container from '../components/Container';
import DelaysList from '../components/DelaysList';

const DUMMY_DATA = [
  {
    id: 'T12R162',
    delayInSeconds: 9,
    estimatedTime: '21:50',
    headsign: 'Wrzeszcz PKP',
    routeId: 162,
    tripId: 12,
    status: 'REALTIME',
    theoreticalTime: '21:50',
    timestamp: '21:47:58',
    trip: 443116,
    vehicleCode: 2531,
    vehicleId: 197
  },
  {
    id: 'T12R163',
    delayInSeconds: 9,
    estimatedTime: '21:50',
    headsign: 'Wrzeszcz PKP',
    routeId: 163,
    tripId: 12,
    status: 'REALTIME',
    theoreticalTime: '21:50',
    timestamp: '21:47:58',
    trip: 443116,
    vehicleCode: 2531,
    vehicleId: 197
  }];

const BusStopByNumberPage = () => {
  const [busStopNumber, setBusStopNumber] = useState( '' );
  const [delays, setDelays] = useState( DUMMY_DATA );
  
  const onChangeHandler = ( e: React.ChangeEvent<HTMLInputElement> ) => {
    setBusStopNumber( e.target.value );
  };
  const onSubmitHandler = async ( e: React.FormEvent<HTMLFormElement> ) => {
    e.preventDefault();
    const url = `http://ckan2.multimediagdansk.pl/delays?stopId=${ busStopNumber }`;
    const rawData = await fetch( url );
    const data = await rawData.json();
    setDelays( data );
  };
  return (
    <Container>
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
