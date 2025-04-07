import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaintPatternService {
  paintPattern: Array<Array<String>>;

  constructor() {
    this.paintPattern = new Array(5).fill(null).map(() => new Array(5).fill("blue"))
  }
}
