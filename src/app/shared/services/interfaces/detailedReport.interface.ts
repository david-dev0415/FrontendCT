import { Time } from '@angular/common';

export interface DetailedReportInterface {
    idRoute: string;
    startDate: Date;
    finalDate: Date;
    maximumSpeed: string;
    time: Time;
    passengersTrip: string;
    brandsDiscounted: string;
    amount: string;
    locks: number;
    kilometres: number;
}
