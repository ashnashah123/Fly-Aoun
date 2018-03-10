import { Carrier } from "./carrier";

export class Segment {
    price: number;
    originId: number;
    destinationId: number; 
    departureDateTime: Date;
    arrivalDateTime: Date;  
    carrier: Carrier;
}