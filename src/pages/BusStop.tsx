import React, { useContext, useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import Container from '../components/Container';
import DelaysList from '../components/DelaysList';
import { DataContext } from '../Shared/DataContext';
import { getDelay } from '../Shared/DataService';

const BusStop = ( props: RouteComponentProps<{ busStopId: string }> ) => {
    const [delays, setDelays] = useState( [] );
    const [loading, setLoading] = useState( true );
    const dataContext = useContext( DataContext );
    const currentStop = dataContext.stopData.find( stop => stop.stopId.toString() === props.match.params.busStopId );
    if ( currentStop ) {
        dataContext.setCurrentStopData( currentStop );
    }
    
    useEffect( () => {
        getDelay( props.match.params.busStopId )
<<<<<<< HEAD
            .then( data => {
                const { delay } = data;
                setDelays( delay );
<<<<<<< HEAD
=======
                setLoading( false );
>>>>>>> stg
            } );
    }, [] );
    
    return (
        <Container>
<<<<<<< HEAD
            { delays ? <DelaysCardsList delays={ delays } busStopNumber={ props.match.params.busStopId }/> :
                <div className='text-center'>
                    <div className="spinner-border text-warning" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div> }
=======
            { delays.length === 0 ?
                loading === false ?
                    <span>
                        <div className="alert alert-info" role="alert">
                            Aktualnie żaden pojazd nie zmierza na ten przystanek...
                        </div>
                    </span>
                    :
                    <div className='text-center'>
                        <div className="spinner-border text-warning" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div>
                :
                <DelaysCardsList delays={ delays } busStopNumber={ props.match.params.busStopId }/> }
            <button className='btn btn-link btn-block' onClick={ () => props.history.goBack() }>
                Powrót
            </button>
>>>>>>> stg
        </Container>
=======
          .then( data => {
              const { delay } = data;
              setDelays( delay );
          } );
    }, [] );
    
    return (
      <Container>
          { delays && <DelaysList delays={ delays } busStopNumber={ props.match.params.busStopId }/> }
      </Container>
>>>>>>> parent of 94efa25... Squashed commit of the following:
    );
};

export default BusStop;
