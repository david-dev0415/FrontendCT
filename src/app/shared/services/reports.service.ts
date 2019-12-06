import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { environment } from '../../../environments/environment.prod';
import { Router } from '@angular/router';
import { ConsolidatedInterface } from './interfaces/consolidated.interface';

@Injectable()
export class ReportsService {

    private readonly rootUrl = environment.rootUrl;
    private readonly reqHeaderAuth: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/x-www-urlencoded', 'No-Auth': 'False' });
    private readonly reqHeaderNoAuth: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/x-www-urlencoded', 'No-Auth': 'True' });

    private listReports: Reports[] = [
        {
            vehiculo: '0071',
            viajes: '7',
            pasajeros: '535'
        },
        {
            vehiculo: '0011',
            viajes: '3',
            pasajeros: '155'
        },
        {
            vehiculo: '0191',
            viajes: '3',
            pasajeros: '200'
        },
        {
            vehiculo: '1791',
            viajes: '5',
            pasajeros: '295'
        },
        {
            vehiculo: '0097',
            viajes: '3',
            pasajeros: '95'
        },
        {
            vehiculo: '0097',
            viajes: '3',
            pasajeros: '95'
        },
        {
            vehiculo: '0097',
            viajes: '3',
            pasajeros: '95'
        },
        {
            vehiculo: '0097',
            viajes: '3',
            pasajeros: '95'
        },
        {
            vehiculo: '0097',
            viajes: '3',
            pasajeros: '95'
        },
        {
            vehiculo: '0097',
            viajes: '3',
            pasajeros: '95'
        },
        {
            vehiculo: '0097',
            viajes: '3',
            pasajeros: '95'
        },
        {
            vehiculo: '0097',
            viajes: '3',
            pasajeros: '95'
        },
        {
            vehiculo: '0097',
            viajes: '3',
            pasajeros: '95'
        },
        {
            vehiculo: '0097',
            viajes: '3',
            pasajeros: '95'
        },
        {
            vehiculo: '0097',
            viajes: '3',
            pasajeros: '95'
        },
        {
            vehiculo: '0097',
            viajes: '3',
            pasajeros: '95'
        },
        {
            vehiculo: '0097',
            viajes: '3',
            pasajeros: '95'
        }
    ];    

    public consolidatedList: any;

    constructor(private http: HttpClient, private router: Router) {
    }

    errorHandler(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
          // A client-side or network error occurred. Handle it accordingly.
          console.error('An error occurred:', error.error.message);
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong,
          console.error(
            `Backend returned code ${error.status}, ` +
            `body was: ${error.error}`);
        }
        // return an observable with a user-facing error message
        return throwError(
          'Something bad happened; please try again later.');
      }

    /**
     * get list of reports
     */
    getListReports() {
        return this.listReports;
    }

    getConsolidated(numberId: string) {
        return this.http.get(this.rootUrl + `/api/Reports/ConsolidatedNumberId?numberId=${numberId}`, { headers: this.reqHeaderNoAuth }).toPromise();
         
    }
}

export interface Reports {
    vehiculo: string;
    viajes: string;
    pasajeros: string;
}