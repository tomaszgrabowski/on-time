export const get = ( url: string, id?: string ) => {
  const urlCombined = (id) ? `${ url }/${ id }` : `${ url }`;
  return fetch( urlCombined )
      .then( raw => raw.json() );
};

export const getGpsData = ( city: string ) => get( `/gpsPositions/${ city }` );
export const getStops = ( city: string ) => get( `/stops/${ city }` );
export const getDelay = ( city: string, busStop: string ) => get( `/delays/${ city }/${ busStop }` );
