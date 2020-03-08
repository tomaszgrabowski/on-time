import { City } from './backend/City';
import { ICommonStop } from './src/Shared/ICommonStop';
import { IDelayResponse } from './backend/Common.interfaces';
import { getUrlFromConfig } from './backend/config';
import { Endpoint } from './backend/Endpoint';
import { IGdanskGpsPositionsResponse, IGdanskStop, IGdanskStopsResponse } from './backend/Gdansk.interfaces';
import { IGdyniaStop } from './backend/Gdynia.interfaces';

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
              .then( ( data: IGdanskStopsResponse & IGdyniaStop[] ): void => {
                let _stops: ICommonStop[] = [];
                if ( req.params.city === City.Gdansk ) {
                  _stops = data.stops.map( ( stop: IGdanskStop ): ICommonStop => {
                    return {
                      stopLat: `${ stop.stopLat }`,
                      stopLon: `${ stop.stopLon }`,
                      stopFullName: `${ stop.stopDesc } ${ stop.subName }`,
                      stopId: `${ stop.stopId }`
                    };
                  } );
                } else {
                  _stops = data.map( ( stop: IGdyniaStop ): ICommonStop => {
                    return {
                      stopLat: `${ stop.stopLat }`,
                      stopLon: `${ stop.stopLon }`,
                      stopFullName: `${ stop.stopName }`,
                      stopId: `${ stop.stopId }`
                    };
                  } );
                }
                res.json( _stops );
              } ) );
    }
);

app.get( '*', ( req: any, res: any ) => {
  res.sendFile( path.join( __dirname, 'build', 'index.html' ) );
} );

console.log( `App is starting on port ${ port }` );
app.listen( port );


