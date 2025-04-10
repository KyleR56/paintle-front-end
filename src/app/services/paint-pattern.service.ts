import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaintPatternService {
  paintPattern;

  constructor() {
    this.paintPattern = signal([
      ['red', 'orange', 'yellow', 'green', 'blue'],
      ['red', 'orange', 'yellow', 'green', 'blue'],
      ['red', 'orange', 'yellow', 'green', 'blue'],
      ['red', 'orange', 'yellow', 'green', 'blue'],
      ['red', 'orange', 'yellow', 'green', 'blue'],
    ]);
  }
}
