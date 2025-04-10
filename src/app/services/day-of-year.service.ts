import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DayOfYearService {
  day: number;

  constructor() {
    const today = new Date();
    const startOfYear = new Date(today.getFullYear(), 0, 0);
    const diff = today.getTime() - startOfYear.getTime();
    const oneDay = 1000 * 60 * 60 * 24;
    this.day = Math.floor(diff / oneDay);
  }
}
