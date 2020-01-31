import express, {Request, Response} from 'express';
import fetch from 'node-fetch';
import path from 'path';

const port: number | string = process.env.PORT || 1334;
const app = express();


app.use( express.static( path.join( __dirname, '../build' ) ) );

app.get( '/delays/:stopId', ( req:Request, res:Response ) => {
    fetch( `http://ckan2.multimediagdansk.pl/delays?stopId=${ req.params.stopId }` )
      .then( ( raw: any ) => raw.json()
        .then( ( data: any ) => res.json( data ) ) );
  }
);

app.get( '/gpsPositions', ( req:Request, res:Response ) => {
    fetch( `http://ckan2.multimediagdansk.pl/gpsPositions` )
      .then( ( raw: any ) => raw.json()
        .then( ( data: any ) => res.json( data ) ) );
  }
);
  app.get( '/stops', ( req:Request, res:Response ) => {
    fetch( `http://ckan.multimediagdansk.pl/dataset/c24aa637-3619-4dc2-a171-a23eec8f2172/resource/d3e96eb6-25ad-4d6c-8651-b1eb39155945/download/stopsingdansk.json` )
      .then( ( raw: any ) => raw.json()
        .then( ( data: any ) => res.json(
          data.stops.filter( ( stop: IStop ) =>
            stop.onDemand === 0 &&
            stop.virtual === 0 &&
            stop.zoneName === 'Gdańsk'
          ) ) ) );
  }
);

app.get( '*', ( req:Request, res:Response ) => {
  res.sendFile( path.join( __dirname, 'build', 'index.html' ));
} );

console.log( `App is starting on port ${ port }` );
app.listen( port );

export interface IStop {
  stopId: number;
  stopCode: string;
  stopName: string;
  stopShortName: string;
  stopDesc: string;
  subName: string;
  date: string;
  zoneId: number;
  zoneName: string;
  virtual: number;
  nonpassenger: number;
  depot: number;
  ticketZoneBorder: number;
  onDemand: number;
  activationDate: string;
  stopLat: number;
  stopLon: number;
  stopUrl: string;
  locationType?: any;
  parentStation?: any;
  stopTimezone: string;
  wheelchairBoarding?: any;
}

