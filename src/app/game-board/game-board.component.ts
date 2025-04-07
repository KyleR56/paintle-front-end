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

  constructor() {
    const data = new Array(this.size).fill(null).map(() => new Array(this.size).fill("black"))
    this.gameBoard = signal(data)
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
