import { Injectable } from '@angular/core';
import { Carrier } from './../Server-Objects/carrier'
import { Place } from './../Server-Objects/place'
import { Result } from './../Server-Objects/result'
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable()
export class SearchService {
    private resultURL = 'http://partners.api.skyscanner.net/apiservices/browseroutes/v1.0/FR/eur/en-US/us/anywhere/anytime/anytime?apikey=prtl6749387986743898559646983194'; 
    

    constructor(private http: HttpClient) { }
    
    getResult(startingCity, endingCity, startingDate, endingDate): Observable<Result> {
        this.resultURL = 'http://partners.api.skyscanner.net/apiservices/browseroutes/v1.0/JFK/en-US/en-US/us/'+startingDate+'/'+endingDate+'/anytime?apikey=prtl6749387986743898559646983194'
        return this.http.get<Result>(this.resultURL);
    }
}