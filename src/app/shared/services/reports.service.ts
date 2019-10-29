import { Injectable } from '@angular/core';

@Injectable()
export class ReportsService {

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

    constructor() {
    }

    /**
     * get list of reports
     */
    getListReports() {
        return this.listReports;
    }

}

export interface Reports {
    vehiculo: string;
    viajes: string;
    pasajeros: string;
}