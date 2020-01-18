export interface IStop {
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
