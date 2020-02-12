import * as geolib from 'geolib';
import React, { useContext, useEffect, useState } from 'react';
import { geolocated, GeolocatedProps } from 'react-geolocated';
import { Link, RouteComponentProps } from 'react-router-dom';
import { ICommonStop } from '../Shared/ICommonStop';
import Container from '../components/Container';
import { DataContext } from '../Shared/DataContext';
import { ICoords } from '../Shared/ICoords';
import { getLocalCache } from '../Shared/LocalStorageService';

const StopsList = ( props: RouteComponentProps<{ city: string }> & GeolocatedProps ) => {
    const data = useContext( DataContext );
    const [stops, setStops] = useState( [] as ICommonStop[] );
    const city = props.match.params.city;
    
    useEffect( () => {
        if ( data.stopData.length === 0 ) {
            const { stops } = getLocalCache();
            data.setStopData( stops );
        }
        if ( props.coords ) {
            const { latitude, longitude } = props.coords;
            const nearStops = data.stopData.filter( stop => isNearStop( {
                longitude: Number(stop.stopLon),
                latitude: Number(stop.stopLat)
            }, { lon: longitude, lat: latitude } ) );
            setStops( nearStops );
        }
    }, [props.coords] );
    
    const isNearStop = ( point: ICoords, cords: { lon: number, lat: number } ): boolean =>
        geolib.isPointWithinRadius(
            point,
            {
                latitude: cords.lat,
                longitude: cords.lon
            },
            1000
        );
    return (
        <Container>
            <br/>
            <br/>
            <h3 className='text-center'>Najbliższe przystanki</h3>
            <div className="list-group text-center">
                { stops.length !== 0 ? stops.map( stop =>
                        <Link to={ `/busStop/${city}/${ stop.stopId }` } key={ stop.stopId } className="list-group-item">
                            { stop.stopFullName }
                        </Link> )
                    : <div className='text-center'>
                        <div className="spinner-border text-warning" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div> }
                { stops.length !== 0 &&
                <Link to={ `/mapPage/${city}/0/0 ` } className="list-group-item list-group-item-warning"><b>Wskaż na
                  mapie</b></Link> }
            </div>
        </Container>
    );
};

export default geolocated()( StopsList );
