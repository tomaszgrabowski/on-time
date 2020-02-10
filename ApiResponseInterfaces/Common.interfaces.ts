export interface IDelay {
    id: string;
    delayInSeconds: number;
    estimatedTime: string;
    headsign: string;
    routeId: number;
    tripId: number;
    status: string;
    theoreticalTime: string;
    timestamp: string;
    trip: number;
    vehicleCode: number;
    vehicleId: number;
}

export interface IDelayResponse {
    lastUpdate: string;
    delay: IDelay[];
}

export interface ICommonStop {
    stopLat: number;
    stopLon: number;
    stopFullName: string;
}
