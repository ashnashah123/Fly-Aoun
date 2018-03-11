import { Carrier } from "./carrier";

export class LegServer {
    legId: number;
    originId: number;
    destinationId: number; 
    departureDateTime: Date;
    arrivalDateTime: Date;  
    carrier: Carrier; // we will need to just get the first element of this from the result -- it should be filtered such that it only has size == 1
    segmentId: Number[]; // we want to filter this out when the size is > 1 aka not include so that we only get direct flights. We want to only get one from the result
}