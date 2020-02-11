import moment from 'moment';

export const getLocalCache = () => {
  const stopsString = localStorage.getItem( "stops" ) || '{"stops":"[]"}';
  const lastUpdate = localStorage.getItem( "lastUpdate" ) || '';
  const city = localStorage.getItem( "city" ) || '';
  const stops = JSON.parse( stopsString );
  const tooOld = moment().diff( lastUpdate, 'days' ) > 7;
  return { tooOld, stops, city };
};
