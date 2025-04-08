import { Component, inject, OnInit, signal } from '@angular/core';
import { PaintPatternService } from '../../services/paint-pattern.service';

@Component({
  selector: 'app-game-board',
  imports: [],
  templateUrl: './game-board.component.html',
  styleUrl: './game-board.component.css'
})
export class GameBoardComponent implements OnInit {
  colors = ['red', 'orange', 'yellow', 'green', 'blue'];
  size = this.colors.length;
  gameData;
  paintPatternService = inject(PaintPatternService)
  paintPattern = signal<Array<Array<String>>>([[]]);

  constructor() {
    const data = new Array(this.size).fill(null).map(() => new Array(this.size).fill("black"))
    this.gameData = signal(data)
  }

  /**
   * Paints the given row with the given color.
   */
  fillRow(color: string, row: number): void {
    if (this.gameIsWon()) {
     return; 
    }
    this.gameData.update(data => {
      for (let col = 0; col < this.size; col++) {
        data[row][col] = color
      }
      return data
    })
  }

  /**
   * Paints the given column with the given color.
   */
  fillColumn(color: string, col: number): void {
    if (this.gameIsWon()) {
      return; 
    }
    this.gameData.update(data => {
      for (let row = 0; row < this.size; row++) {
        data[row][col] = color
      }
      return data
    })
  }

  /**
   * Resets to the starting game state by clearing the board.
   */
  clear(): void {
    if (this.gameIsWon()) {
      return; 
    }
    this.gameData.update(data => {
      for (let row = 0; row < this.size; row++) {
        for (let col = 0; col < this.size; col++) {
          data[row][col] = 'black'
        }
      }
      return data
    })
  }

  /**
   * @returns true if the player has won the game.
   */
  gameIsWon(): boolean {
    if (this.paintPattern().length == 0) {
      return false;
    }
    for (let row = 0; row < this.size; row++) {
      for (let col = 0; col < this.size; col++) {
        if (this.gameData()[row][col] != this.paintPattern()[row][col]) {
          return false
        }
      }
    }
    return true;
  }

  ngOnInit(): void {
    this.paintPattern.set(this.paintPatternService.paintPattern)
  }
}
