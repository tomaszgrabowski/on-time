export interface IGdanskStopsResponse {
    lastUpdate: string;
    stops: IGdanskStop[];
}

export interface IGdanskStop {
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

export interface IVehicle {
    DataGenerated: string;
    Line: string;
    Route: string;
    VehicleCode: string;
    VehicleService: string;
    VehicleId: number;
    Speed: number;
    Delay: number;
    Lat: number;
    Lon: number;
    GPSQuality: number;
}

export interface IGdanskGpsPositionsResponse {
    LastUpdateData: string;
    Vehicles: IVehicle[];
}

