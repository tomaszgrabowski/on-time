import { IDelay } from './../src/Shared/IDelay';

export interface IDelayResponse {
    lastUpdate: string;
    delay: IDelay[];
}
