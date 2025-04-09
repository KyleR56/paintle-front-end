import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaintPatternService {
  paintPattern: string[][];

  constructor() {
    this.paintPattern = [
      ['red', 'orange', 'yellow', 'green', 'blue'],
      ['red', 'orange', 'yellow', 'green', 'blue'],
      ['red', 'orange', 'yellow', 'green', 'blue'],
      ['red', 'orange', 'yellow', 'green', 'blue'],
      ['red', 'orange', 'yellow', 'green', 'blue'],
    ];
  }
}
