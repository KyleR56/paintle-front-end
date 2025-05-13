import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateService {
  // Public values
  readonly day: number;
  readonly month: number;
  readonly dayOfYear: number;

  constructor() {
    const now = new Date();

    this.day = now.getDate();

    this.month = now.getMonth() + 1;

    const startOfYear = new Date(now.getFullYear(), 0, 0);
    const timeDiff = (now.getTime() - startOfYear.getTime()) + ((startOfYear.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000);
    this.dayOfYear = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  }
}
