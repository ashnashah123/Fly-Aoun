import { Injectable } from '@angular/core';
<<<<<<< HEAD
import { Carrier } from './../Server-Objects/carrier';
import { Place } from './../Server-Objects/place';
import { Segment } from './../Server-Objects/segment';
=======
import { Carrier } from './../Server-Objects/carrier'
import { Place } from './../Server-Objects/place'
import { Segment } from './../Server-Objects/segment'
import { Result } from './../Server-Objects/result'
>>>>>>> 504bda195bb93a3c0d41fe16932fe96e2ef7c4ff
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable()
export class SearchService {
<<<<<<< HEAD
    constructor() {}


    getResults(startingCity: String, endingCity: String, startingDate: Date, 
        endingDate: Date, budgetRestriction: Number): Observable<Segment[]> {
        return;
    }
=======

    private segmentsURL = 'http://partners.api.skyscanner.net/apiservices/browseroutes/v1.0/FR/eur/en-US/us/anywhere/anytime/anytime?apikey=prtl6749387986743898559646983194'; 
>>>>>>> 504bda195bb93a3c0d41fe16932fe96e2ef7c4ff

    constructor(private http: HttpClient) { }
    
    getSegment(): Observable<Result[]> {
        return this.http.get<Result[]>(this.segmentsURL);
    }
}