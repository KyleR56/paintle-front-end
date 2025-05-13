import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { DateService } from './date.service';

interface Puzzle {
  id: number;
  pattern: string[][];
}

@Injectable({
  providedIn: 'root'
})
export class PaintPatternService {
  // Services
  private readonly http = inject(HttpClient);
  private readonly dateService = inject(DateService);

  // Derived values
  private readonly puzzleId = this.dateService.dayOfYear;

  // Signals
  private readonly _paintPattern = signal<string[][]>([]);
  readonly paintPattern = this._paintPattern.asReadonly();

  constructor() {
    const apiUrl = `https://paintle.net/api/puzzles/${this.puzzleId}`;
    this.http.get<Puzzle>(apiUrl).subscribe({
      next: (puzzle) => this._paintPattern.set(puzzle.pattern),
      error: (error) => console.error('Failed to fetch puzzle pattern:', error)
    });
  }
}
