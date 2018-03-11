import { Injectable } from '@angular/core';
import { Carrier } from './../Server-Objects/carrier';
import { Place } from './../Server-Objects/place';
import { Segment } from './../Server-Objects/segment';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders } from '@angular/common/http';



@Injectable()
export class SearchService {
    constructor() {}


    getResults(startingCity: String, endingCity: String, startingDate: Date, 
        endingDate: Date, budgetRestriction: Number): Observable<Segment[]> {
        return;
    }

}