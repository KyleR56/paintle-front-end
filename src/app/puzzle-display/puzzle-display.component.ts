import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-puzzle-display',
  imports: [],
  templateUrl: './puzzle-display.component.html',
  styleUrl: './puzzle-display.component.css'
})
export class PuzzleDisplayComponent {
  puzzle;

  constructor() {
    const data = new Array(5).fill(null).map(() => new Array(5).fill("red"))
    this.puzzle = signal(data)
  }
}
