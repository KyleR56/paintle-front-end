import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';

interface Puzzle {
  day: number;
  pattern: string[][];
}

@Injectable({
  providedIn: 'root'
})
export class PaintPatternService {
  private http = inject(HttpClient);

  paintPattern = signal<string[][]>([]);

  constructor() {
    const dayOfYear = this.getDayOfYear();
    const url = `http://localhost:3000/api/puzzle/${dayOfYear}`;
    this.http.get<Puzzle>(url).subscribe(puzzle => {
      this.paintPattern.set(puzzle.pattern);
    });
  }

  private getDayOfYear() {
    const today = new Date();
    const startOfYear = new Date(today.getFullYear(), 0, 0);
    const diff = today.getTime() - startOfYear.getTime();
    const oneDay = 1000 * 60 * 60 * 24;
    return Math.floor(diff / oneDay);
  }
}
