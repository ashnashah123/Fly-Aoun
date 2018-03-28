import { Component, OnInit } from '@angular/core';
import { SearchService } from '../Search-Services/search.service';
import { Result } from '../Server-Objects/result';
import { Observable } from 'rxjs/Observable';
import { LegServer } from '../Server-Objects/legServer';
import { Carrier } from '../Server-Objects/carrier';
import { Place } from '../Server-Objects/place';
import { Itinerary } from '../Server-Objects/itinerary';
import { FlightDetails } from '../Server-Objects/flightDetails';
import { Leg } from '../Client-Objects/leg';

@Component({
  selector: 'searchBar',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class searchBarComponent implements OnInit { 
  results: Result;
  legs: LegServer[];
  carriers: Carrier[];
  places: Place[];
  itineraries: Itinerary[];
  flights: FlightDetails[];
  daysSpent: 2;
  finalFlightPath: FlightDetails[];

  constructor(private searchService: SearchService) {}

  ngOnInit(): void { }

  //gets data returned from API
  startingCity: String;
  endingCity: String;
  startingDate: Date;
  endingDate: Date;

  submitSearch(): void {
    this.searchService.getResult(this.startingCity, this.endingCity, this.startingDate, this.endingDate).subscribe(results=>{
      this.results = results;
      this.legs = this.results.legs;
      this.carriers = this.results.carriers;
      this.places = this.results.places;
      this.itineraries = this.results.itineraries;

      this.flights = this.createFlightList();
      this.finalFlightPath = this.getBestFlightPath(this.startingCity, this.endingCity, this.startingDate, this.endingDate);
    });
  }

  // Take data from Skyscanner API and compile into an object (flightDetails) that is easy for us to use
  createFlightList(): Array<FlightDetails> {
    let flightDetails = new FlightDetails();
    // loop through itineraries to get prices
    this.itineraries.forEach(itinerary => {
      // loop through legs to get the destination and origin cities, as well as departure date and time
      this.legs.forEach(leg => {
        // if we have a direct flight (we only want direct flights, so segmentID length == 1)
        if (leg.segmentId.length == 1) {
          // if the itinerary and leg we are on match (we have the same flight)
          if (itinerary.outBoundLegId == leg.legId) {
            // then look through the places to find our current city
            this.places.forEach(place => {
              // had to match origin Id to place Id to figure out what city we are at
              if (leg.originId == place.id) {
                // then start matching the origin and departure info to make our flightDetails
                flightDetails.origin = place.cityName;
                flightDetails.departDateTime = leg.departureDateTime;
                flightDetails.price = itinerary.price;
                this.carriers.forEach(carrier => {
                  if (leg.carrier.id = carrier.id) {
                    flightDetails.carrier = carrier.name;
                  }
                });
              }
              // do the same for destination IDs to find the city we are going to
              if (leg.destinationId == place.id) {
                flightDetails.destination = place.cityName;
                flightDetails.arrivalDateTime = leg.arrivalDateTime;
              }
            });
          }
        }  
      });
      // adding our newly created flight itinerary to the flights!
      this.flights.push(flightDetails);
    });
    return this.flights;
  }

  getBestFlightPath(firstCity, lastCity, firstDate: Date, lastDate: Date): Array<FlightDetails>{
    let listStartFlights = new Array<FlightDetails>();
    let bestFlightPath = new Array<FlightDetails>();
    let initialCity, endCity;
    let initialDate = new Date();
    let finalDate = new Date();
    let firstDatePlusTwo = new Date();
    let firstDatePlusOne = new Date();

    firstDatePlusTwo = new Date(firstDate.getHours() + 48);
    firstDatePlusOne = new Date(firstDate.getHours() + 24);

    // base case:
    // if the date we are at is either one or two days from the final date, 
    if (firstDate == lastDate || firstDatePlusOne == lastDate) {
      let listOfFinalFlights = new Array<FlightDetails>();
      this.flights.forEach(flight => {
        if (flight.origin == firstCity && flight.destination == lastCity) {
          listOfFinalFlights.push(flight);
          listStartFlights.sort((a, b) => {
            if (a.price < b.price) {
              return -1;
            }
            else {
              return 1;
            }
          })
        }
        let lastFlight = listStartFlights[0];
        bestFlightPath.push(lastFlight);
      });
      return bestFlightPath;
    }

    // adds the cheapest flight of the start dest to the final list
    // also creates a list of all flights out of startDest and sorts them by price (first should be cheapest)
    this.flights.forEach(flight => {
      // if the flight from the flight list is the city we want to depart from and the time matches
      if (flight.origin == firstCity && flight.departDateTime == firstDate) {
        // add the flight to the list of start flights to sort later
        listStartFlights.push(flight);
        initialCity = flight.origin;
        endCity = flight.destination;
        initialDate = flight.departDateTime;
        finalDate = flight.arrivalDateTime;
      }
    });
    // sort based on price to get the first flight
    listStartFlights.sort((a, b) => {
      if (a.price < b.price) {
        return -1;
      }
      else {
        return 1;
      }
    })
    // add the cheapest flight to our best flight path
    let firstFlight = listStartFlights[0];
    bestFlightPath.push(firstFlight);
    // update the day to continue the recursion
    let firstDateNew = new Date(firstDate.getHours() + 48);
    return this.getBestFlightPath(endCity, lastCity, firstDateNew, lastDate)
  }
}
