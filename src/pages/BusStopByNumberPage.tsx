import React, { useState } from 'react';
import Container from '../components/Container';
import DelaysList from '../components/DelaysList';

const DUMMY_DATA = [
  {
    id: 'T12R162',
    delayInSeconds: -166,
    estimatedTime: '12:43',
    headsign: 'Wrzeszcz PKP',
    routeId: 162,
    tripId: 12,
    status: 'REALTIME',
    theoreticalTime: '12:43',
    timestamp: '12:40:43',
    trip: 467265,
    vehicleCode: 2502,
    vehicleId: 91
  },
  {
    id: 'T21R154',
    delayInSeconds: 307,
    estimatedTime: '12:50',
    headsign: 'Orunia Górna',
    routeId: 154,
    tripId: 21,
    status: 'REALTIME',
    theoreticalTime: '12:45',
    timestamp: '12:40:43',
    trip: 468715,
    vehicleCode: 2538,
    vehicleId: 366
  },
  {
    id: 'T12R154',
    delayInSeconds: 7,
    estimatedTime: '12:50',
    headsign: 'Wały Piastowskie',
    routeId: 154,
    tripId: 12,
    status: 'REALTIME',
    theoreticalTime: '12:50',
    timestamp: '12:40:43',
    trip: 468716,
    vehicleCode: 2538,
    vehicleId: 366
  },
  {
    id: 'T31R162',
    delayInSeconds: 623,
    estimatedTime: '13:03',
    headsign: 'Orunia Górna',
    routeId: 162,
    tripId: 31,
    status: 'REALTIME',
    theoreticalTime: '12:53',
    timestamp: '12:40:27',
    trip: 469043,
    vehicleCode: 2664,
    vehicleId: 145717
  },
  {
    id: 'T12R162',
    delayInSeconds: 23,
    estimatedTime: '13:03',
    headsign: 'Wrzeszcz PKP',
    routeId: 162,
    tripId: 12,
    status: 'REALTIME',
    theoreticalTime: '13:03',
    timestamp: '12:40:27',
    trip: 469044,
    vehicleCode: 2664,
    vehicleId: 145717
  },
  {
    id: 'T21R154',
    delayInSeconds: 306,
    estimatedTime: '13:05',
    headsign: 'Orunia Górna',
    routeId: 154,
    tripId: 21,
    status: 'REALTIME',
    theoreticalTime: '13:00',
    timestamp: '12:40:45',
    trip: 470761,
    vehicleCode: 2516,
    vehicleId: 105
  },
  {
    id: 'T12R154',
    delayInSeconds: 6,
    estimatedTime: '13:05',
    headsign: 'Wały Piastowskie',
    routeId: 154,
    tripId: 12,
    status: 'REALTIME',
    theoreticalTime: '13:05',
    timestamp: '12:40:45',
    trip: 470762,
    vehicleCode: 2516,
    vehicleId: 105
  },
  {
    id: 'T31R162',
    delayInSeconds: 605,
    estimatedTime: '13:23',
    headsign: 'Orunia Górna',
    routeId: 162,
    tripId: 31,
    status: 'REALTIME',
    theoreticalTime: '13:13',
    timestamp: '12:40:45',
    trip: 473552,
    vehicleCode: 2509,
    vehicleId: 98
  }
];

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
