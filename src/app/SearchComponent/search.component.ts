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

  createFlightList(): Array<FlightDetails> {
    let flightDetails = new FlightDetails();
    this.itineraries.forEach(itinerary => {
      this.legs.forEach(leg => {
        if (leg.segmentId.length == 1) {
          if (itinerary.outBoundLegId == leg.legId) {
            this.places.forEach(place => {
              if (leg.originId == place.id) {
                flightDetails.origin = place.cityName;
                flightDetails.departDateTime = leg.departureDateTime;
                flightDetails.price = itinerary.price;
                this.carriers.forEach(carrier => {
                  if (leg.carrier.id = carrier.id) {
                    flightDetails.carrier = carrier.name;
                  }
                });
              }
              if (leg.destinationId == place.id) {
                flightDetails.destination = place.cityName;
                flightDetails.arrivalDateTime = leg.arrivalDateTime;
              }
            });
          }
        }  
      });
      // adding to a global array
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


    if (firstDate== lastDate || firstDatePlusOne == lastDate) {
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
      if (flight.origin == firstCity && flight.departDateTime == firstDate) {
        listStartFlights.push(flight);
        initialCity = flight.origin;
        endCity = flight.destination;
        initialDate = flight.departDateTime;
        finalDate = flight.arrivalDateTime;
        // sort based on price for first flight
        listStartFlights.sort((a, b) => {
          if (a.price < b.price) {
            return -1;
          }
          else {
            return 1;
          }
        })
      }
      let firstFlight = listStartFlights[0];
      bestFlightPath.push(firstFlight);
    });
    let firstDateNew = new Date(firstDate.getHours() + 48);
    return this.getBestFlightPath(endCity, lastCity, firstDateNew, lastDate)
  }
}
