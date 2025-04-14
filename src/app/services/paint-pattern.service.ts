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
  private http = inject(HttpClient);

  private dateService = inject(DateService);
  private id = this.dateService.absoluteDay;

  paintPattern = signal<string[][]>([]);

  constructor() {
    const url = `https://paintle.net/api/puzzle/${this.id}`;
    this.http.get<Puzzle>(url).subscribe(
      (puzzle) => { this.paintPattern.set(puzzle.pattern); },
      (error) => { console.log(error); }
    );
  }
}
