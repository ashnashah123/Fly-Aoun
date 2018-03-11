import { Itinerary } from "./itinerary";
import { Carrier } from "./carrier";
import { Place } from "./place";
import { LegServer } from "./legServer";

export class Result {
    query: any[];
    itineraries: Itinerary[];
    legs: LegServer[];
    segments: any[];
    carriers: Carrier[];
    agents: any[];
    places: Place[];
    currencies: any[];
}