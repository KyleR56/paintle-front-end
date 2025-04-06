import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-game-board',
  imports: [],
  templateUrl: './game-board.component.html',
  styleUrl: './game-board.component.css'
})
export class GameBoardComponent {
  colors = ['red', 'orange', 'yellow', 'green', 'blue'];
  size = this.colors.length;
  gameBoard;
  paintbrushes;

  constructor() {
    const data = new Array(this.size).fill(null).map(() => new Array(this.size).fill("black"))
    this.gameBoard = signal(data)

    const rowPaintbrushes = new Array(this.size).map((_, idx) => [idx, -1]);
    const colPaintbrushes = new Array(this.size).map((_, idx) => [-1, idx]);
    this.paintbrushes = rowPaintbrushes.concat(colPaintbrushes)
  }

  fillRow(color: string, row: number) {
    this.gameBoard.update(data => {
      for (let col = 0; col < this.size; col++) {
        data[row][col] = color
      }
      return data
    })
  }

  fillColumn(color: string, col: number) {
    this.gameBoard.update(data => {
      for (let row = 0; row < this.size; row++) {
        data[row][col] = color
      }
      return data
    })
  }
}
