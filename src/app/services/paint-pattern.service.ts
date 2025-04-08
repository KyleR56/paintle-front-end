import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaintPatternService {
  paintPattern: Array<Array<String>>;

  constructor() {
    this.paintPattern = [
      ['red', 'orange', 'yellow', 'green', 'blue'],
      ['red', 'orange', 'yellow', 'green', 'blue'],
      ['red', 'orange', 'yellow', 'green', 'blue'],
      ['red', 'orange', 'yellow', 'green', 'blue'],
      ['red', 'orange', 'yellow', 'green', 'blue'],
    ]
  }
}
