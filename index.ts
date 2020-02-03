const express = require( 'express' );
const fetch = require( 'node-fetch' );
const path = require( 'path' );

const port: number | string = process.env.PORT || 1334;
const app = express();


app.use( express.static( path.join( __dirname, 'build' ) ) );

app.use(function(req: any, res: any, next: any) {
  var schema = (req.headers['X-Forwarded-Proto'] || '').toLowerCase();
  console.log(schema, 'https://' + req.headers.host + req.url);
  if (schema === 'http') {
    res.redirect('https://' + req.headers.host + req.url);
  }
});

app.get( '/delays/:stopId', ( req: any, res: any ) => {
      fetch( `http://ckan2.multimediagdansk.pl/delays?stopId=${ req.params.stopId }` )
        .then( ( raw: any ) => raw.json()
          .then( ( data: any ) => res.json( data ) ) );
  }
);

app.get( '/gpsPositions', ( req: any, res: any ) => {
      fetch( `http://ckan2.multimediagdansk.pl/gpsPositions` )
        .then( ( raw: any ) => raw.json()
          .then( ( data: any ) => res.json( data ) ) );
  }
);
app.get( '/stops', ( req: any, res: any ) => {
      fetch( `http://ckan.multimediagdansk.pl/dataset/c24aa637-3619-4dc2-a171-a23eec8f2172/resource/d3e96eb6-25ad-4d6c-8651-b1eb39155945/download/stopsingdansk.json` )
        .then( ( raw: any ) => raw.json()
          .then( ( data: any ) => res.json(
            data
          ) ) );
  }
);



app.get( '*', ( req: any, res: any ) => {
    res.sendFile( path.join( __dirname, 'build', 'index.html' ) );
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

