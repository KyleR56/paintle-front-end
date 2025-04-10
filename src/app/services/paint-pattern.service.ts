import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { DayOfYearService } from './day-of-year.service';

interface Puzzle {
  day: number;
  pattern: string[][];
}

@Injectable({
  providedIn: 'root'
})
export class PaintPatternService {
  private http = inject(HttpClient);

  private dayOfYearService = inject(DayOfYearService);
  private day = this.dayOfYearService.day;

  paintPattern = signal<string[][]>([]);

  constructor() {
    const url = `http://localhost:3000/api/puzzle/${this.day}`;
    this.http.get<Puzzle>(url).subscribe(puzzle => {
      this.paintPattern.set(puzzle.pattern);
    });
  }
}
