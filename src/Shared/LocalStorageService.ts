import moment from 'moment';

export const getStopsFromLocalCache = () => {
    const stopsString = localStorage.getItem( 'stops' ) || '{"lastUpdate": "2000-01-01", "stops":"[]"}';
    const { lastUpdate, stops } = JSON.parse( stopsString );
    const tooOld = moment().diff( lastUpdate, 'days' ) > 7;
    return { tooOld, stops };
};
