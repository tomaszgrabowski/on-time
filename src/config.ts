import { City } from './common/City';
import { Endpoint } from './common/Endpoint';

export const urls: IHaveEndpoints = {
    [Endpoint.delays]: {
        [City.Gdansk]: 'http://ckan2.multimediagdansk.pl/delays?stopId=',
        [City.Gdynia]: 'http://api.zdiz.gdynia.pl/pt/delays?stopId='
    },
    [Endpoint.stops]: {
        [City.Gdansk]: 'http://ckan.multimediagdansk.pl/dataset/c24aa637-3619-4dc2-a171-a23eec8f2172/resource/d3e96eb6-25ad-4d6c-8651-b1eb39155945/download/stopsingdansk.json',
        [City.Gdynia]: 'http://api.zdiz.gdynia.pl/pt/stops'
    },
    [Endpoint.gpsPositions]: {
        [City.Gdansk]: 'http://ckan2.multimediagdansk.pl/gpsPositions',
        [City.Gdynia]: null
    }
};

export type IHaveCities = {
    [key in City]: string | null
}

export type IHaveEndpoints = {
    [key in Endpoint]: IHaveCities
}

export const getUrlFromConfig = ( endpoint: Endpoint, city: City ) => urls[endpoint][city];
