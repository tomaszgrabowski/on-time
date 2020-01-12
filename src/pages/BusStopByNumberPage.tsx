import React, { useState } from 'react';
import Container from '../components/Container';

interface IDelay {
  id: string;
  delayInSeconds: number;
  estimatedTime: string;
  headsign: string;
  routeId: number;
  tripId: number
  status: string;
  theoreticalTime: string;
  timestamp: string;
  trip: number;
  vehicleCode: number;
  vehicleId: number;
}

const BusStopByNumberPage = () => {
  const [busStopNumber, setBusStopNumber] = useState( '' );
  const [delays, setDelays] = useState( [] );
  
  const onChangeHandler = ( e: React.ChangeEvent<HTMLInputElement> ) => {
    setBusStopNumber( e.target.value );
  };
  const onSubmitHandler = async ( e: React.FormEvent<HTMLFormElement> ) => {
    e.preventDefault();
    const url = `http://ckan2.multimediagdansk.pl/delays?stopId=${ busStopNumber }`;
    const rawData = await fetch( url );
    const data = await rawData.json();
    setDelays( data.delay );
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
      { delays && <ul className="list-group">
        { delays.map( ( delay: IDelay ) => (
          <li className='list-group-item' key={ delay.id }>{ delay.routeId }</li>) ) }
      </ul> }
    </Container>
  );
};

export default BusStopByNumberPage;
