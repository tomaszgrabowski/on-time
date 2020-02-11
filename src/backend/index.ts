import { Endpoint } from '../common/Endpoint';
import { ICommonStop, IDelayResponse } from '../common/common.interfaces';
import { IGdanskGpsPositionsResponse, IGdanskStop } from '../common/Gdansk.interfaces';
import { IGdyniaStop } from '../common/Gdynia.interfaces';
import { getUrlFromConfig } from '../../src/config';

const express = require( 'express' );
const fetch = require( 'node-fetch' );
const path = require( 'path' );

const port: number | string = process.env.PORT || 1334;
const app = express();


app.use( express.static( path.join( __dirname, 'build' ) ) );

app.get( '/delays/:city/:stopId', ( req: any, res: any ) => {
        fetch( `${ getUrlFromConfig( Endpoint.delays, req.params.city ) }${ req.params.stopId }` )
            .then( ( raw: any ) => raw.json()
                .then( ( data: any ): IDelayResponse => res.json( data ) ) );
    }
);

app.get( '/gpsPositions/:city', ( req: any, res: any ) => {
        fetch( `${ getUrlFromConfig( Endpoint.gpsPositions, req.params.city ) }` )
            .then( ( raw: any ) => raw.json()
                .then( ( data: any ): IGdanskGpsPositionsResponse => res.json( data ) ) );
    }
);

app.get( '/stops/:city', ( req: any, res: any ) => {
        fetch( `${ getUrlFromConfig( Endpoint.stops, req.params.city ) }` )
            .then( ( raw: any ) => raw.json()
                .then( ( data: any ): ICommonStop[] => {
                    return data.map( ( stop: IGdanskStop & IGdyniaStop ): ICommonStop => {
                        return {
                            stopLat: `${stop.stopLat}`,
                            stopLon: `${stop.stopLon}`,
                            stopFullName: stop.subName ? `${ stop.stopName } ${ stop.subName }` : `${ stop.stopName }`
                        };
                    } );
                } ) );
    }
);

app.get( '*', ( req: any, res: any ) => {
    res.sendFile( path.join( __dirname, 'build', 'index.html' ) );
} );

console.log( `App is starting on port ${ port }` );
app.listen( port );


