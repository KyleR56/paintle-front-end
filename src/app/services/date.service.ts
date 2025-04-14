import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateService {
  day: number;
  month: number;

  absoluteDay: number;

  constructor() {
    const today = new Date();

    this.day = today.getDate();

    this.month = today.getMonth() + 1;

    const startOfYear = new Date(today.getFullYear(), 0, 0);
    const diff = today.getTime() - startOfYear.getTime();
    const oneDay = 1000 * 60 * 60 * 24;
    this.absoluteDay = Math.floor(diff / oneDay);
  }
}
