export const get = ( url: string, id?: string ) => {
    const urlCombined = (id) ? `${ url }/${ id }` : `${ url }`;
    return fetch( urlCombined )
      .then( raw => raw.json() );
};

export const getGpsData = get( `/gpsPositions` );
export const getStops = get( `/stops` );
export const getDelay = ( busStop: string ) => get( `/delays/${ busStop }` );
