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

    const startOfYear = new Date(now.getFullYear(), 0, 1);
    const dstDiff = ((startOfYear.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000);
    const timeDiff = (now.getTime() - startOfYear.getTime()) + dstDiff;
    this.dayOfYear = Math.floor(timeDiff / (1000 * 60 * 60 * 24)) + 1;
  }
}
