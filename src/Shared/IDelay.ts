export interface IDelay {
  id: string;
  delayInSeconds: number;
  estimatedTime: string;
  headsign: string;
  routeId: number;
  tripId: number
  status: string;
  theoreticalTime: string;
  timestamp: string;
  trip: number;
  vehicleCode: number;
  vehicleId: number;
}
