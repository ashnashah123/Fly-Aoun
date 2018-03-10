import { Segment } from "./segment";
import { Carrier } from "./carrier";
import { Place } from "./place";

export class Result {
    query: any[];
    itineraries: any[];
    legs: any[];
    segments: Segment[];
    carriers: Carrier[];
    agents: any[];
    places: Place[];
    currencies: any[];
}