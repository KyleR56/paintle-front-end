import { inject, Injectable, signal } from '@angular/core';
import { ColorService } from './color.service';
import { PaintPatternService } from './paint-pattern.service';

export interface GameState {
  board: string[][];
  hasWon: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class GameStateService {
  gameState;

  private colorService = inject(ColorService);
  private colors = this.colorService.colors;
  private defaultColor = this.colorService.defaultColor;

  private paintPatternService = inject(PaintPatternService);
  private paintPattern = this.paintPatternService.paintPattern;

  constructor () {
    const size = this.colors().length;
    const initialBoard = new Array(size)
      .fill(null)
      .map(() => new Array(size).fill(this.defaultColor()));
    const initialState = {
      board: initialBoard,
      hasWon: false
    };

    this.gameState = signal(initialState);
  }

  private updateState(newState: Partial<GameState>) {
    this.gameState.set({
      ...this.gameState(),
      ...newState
    });
  }

  private resetState() {
    const size = this.colorService.colors().length;
    const initialBoard = new Array(size)
      .fill(null)
      .map(() => new Array(size).fill(this.defaultColor()));
    const initialState = {
      board: initialBoard,
      hasWon: false,
    };

    this.gameState.set(initialState);
  }

  fillRow(row: number, color: string) {
    if (this.gameState().hasWon) {
      return;
    }

    const newBoard = [...this.gameState().board];
    for (let col = 0; col < newBoard.length; col++) {
      newBoard[row][col] = color;
    }

    let newHasWon = true;
    for (let row = 0; row < newBoard.length; row++) {
      for (let col = 0; col < newBoard.length; col++) {
        if (newBoard[row][col] != this.paintPattern()[row][col]) {
          newHasWon = false;
        }   
      }
    }

    this.updateState({ board: newBoard, hasWon: newHasWon });
  }

  fillColumn(col: number, color: string) {
    if (this.gameState().hasWon) {
      return;
    }

    const newBoard = [...this.gameState().board];
    for (let row = 0; row < newBoard.length; row++) {
      newBoard[row][col] = color;
    }

    let newHasWon = true;
    for (let row = 0; row < newBoard.length; row++) {
      for (let col = 0; col < newBoard.length; col++) {
        if (newBoard[row][col] != this.paintPattern()[row][col]) {
          newHasWon = false;
        }   
      }
    }

    this.updateState({ board: newBoard, hasWon: newHasWon });
  }

  clearBoard() {
    if (this.gameState().hasWon) {
      return;
    }
    this.resetState();
  }
}
