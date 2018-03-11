export class Itinerary {
    outBoundLegId: number; // we do not care about the inboundLegId
    price: number; // when we get it from result, we just want to grab the min(pricingOptions[])
}