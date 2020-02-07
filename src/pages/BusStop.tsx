import React, { useContext, useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import Container from '../components/Container';
import DelaysCardsList from '../components/DelaysCard/DelaysCardsList';
import { DataContext } from '../Shared/DataContext';
import { getDelay } from '../Shared/DataService';

const BusStop = ( props: RouteComponentProps<{ busStopId: string }> ) => {
    const [delays, setDelays] = useState( [] );
    const dataContext = useContext( DataContext );
    const currentStop = dataContext.stopData.find( stop => stop.stopId.toString() === props.match.params.busStopId );
    if ( currentStop ) {
        dataContext.setCurrentStopData( currentStop );
    }
    
    useEffect( () => {
        getDelay( props.match.params.busStopId )
            .then( data => {
                const { delay } = data;
                setDelays( delay );
            } );
    }, [] );
    
    return (
        <Container>
            { delays ? <DelaysCardsList delays={ delays } busStopNumber={ props.match.params.busStopId }/> :
                <div className='text-center'>
                    <div className="spinner-border text-warning" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div> }
        </Container>
    );
};

export default BusStop;
