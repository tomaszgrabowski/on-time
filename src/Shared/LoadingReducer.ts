export type ILoadingState = {
    loading: boolean;
    error: boolean;
    data: any;
}

export type IAction = {
    type: ActionName;
    payload?: any;
}

export enum ActionName {
    SET_LOADING,
    SET_LOADED,
    SET_ERROR,
}

export const loadingReducerInitialState = { loading: false, error: false, data: {} };

export const loadingReducer = ( state: ILoadingState = loadingReducerInitialState, action: IAction ): ILoadingState => {
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
