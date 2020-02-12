import React, { useContext, useEffect, useReducer, useState } from 'react';
import { geolocated } from 'react-geolocated';
import { RouteComponentProps } from 'react-router-dom';
import Container from '../components/Container';
import { DataContext } from '../Shared/DataContext';
import { getStops } from '../Shared/DataService';
import { getLocalCache } from '../Shared/LocalStorageService';
import LoadingComponent from './../components/LoadingComponent';

const LoadingPage = ( props: RouteComponentProps<{ city: string }> ) => {
    const [loadingState, dispatch] = useReducer( loadingReducer, loadingReducerInitialState );
    const dataContext = useContext( DataContext );
    const currentCity = props.match.params.city;
    
    useEffect( () => {
        dispatch( { type: ActionName.SET_LOADING } );
        const { tooOld, stops, city } = getLocalCache();
        if ( !tooOld && city === currentCity ) {
            dataContext.setStopData( stops );
            dispatch( { type: ActionName.SET_LOADED } );
            props.history.push( `/stopsList/${ currentCity }` );
        } else {
            getStops( currentCity )
              .then( data => {
                    dataContext.setStopData( data );
                    localStorage.setItem( 'stops', JSON.stringify( data ) );
                    localStorage.setItem( 'lastUpdate', `"${ new Date().toUTCString() }"` );
                    localStorage.setItem( 'city', currentCity );
                    dispatch( { type: ActionName.SET_LOADED } );
                    props.history.push( `/stopsList/${ currentCity }` );
                },
                () => dispatch( { type: ActionName.SET_ERROR } )
              );
        }
    }, [] );
    
    return (
      <Container className='text-center'>
          <LoadingComponent error={ loadingState.error } loading={ loadingState.loading }/>
      </Container>
    );
};

export default geolocated()( LoadingPage );

type ILoadingState = {
    loading: boolean;
    error: boolean;
    data: any;
}

type IAction = {
    type: ActionName;
    payload?: any;
}

enum ActionName {
    SET_LOADING,
    SET_LOADED,
    SET_ERROR,
}

const loadingReducerInitialState = { loading: false, error: false, data: {} };

const loadingReducer = ( state: ILoadingState = loadingReducerInitialState, action: IAction ): ILoadingState => {
    switch ( action.type ) {
        case ActionName.SET_LOADING:
            return { loading: true, error: false, data: null };
        case ActionName.SET_LOADED:
            return { loading: false, error: false, data: action.payload };
        case ActionName.SET_ERROR:
            return { loading: false, error: true, data: null };
        
    }
    return state;
};
