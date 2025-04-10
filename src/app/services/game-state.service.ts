import { inject, Injectable, signal } from '@angular/core';
import { ColorService } from './color.service';
import { PaintPatternService } from './paint-pattern.service';

export interface GameState {
  day: number;
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

  private gameStateKey = 'gameState';

  constructor () {
    this.gameState = signal(this.loadGameState());
  }

  private updateState(newState: Partial<GameState>) {
    this.gameState.set({
      ...this.gameState(),
      ...newState
    });
    this.saveGridData();
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

    const size = this.colorService.colors().length;
    const newBoard = new Array(size)
      .fill(null)
      .map(() => new Array(size).fill(this.defaultColor()));

    this.updateState({ board: newBoard, hasWon: false });
  }

  private loadGameState(): GameState {
    const day = this.getDayOfYear();
    const data = localStorage.getItem(this.gameStateKey);

    if (data) {
      const gameState = JSON.parse(data);
      if (gameState.day == day) {
        return gameState;
      }
    }

    const size = this.colors().length;
    const initialBoard: string[][] = new Array(size)
      .fill(null)
      .map(() => new Array(size).fill(this.defaultColor()));
    const initialState: GameState = {
      day: day,
      board: initialBoard,
      hasWon: false
    };

    return initialState;
  }

  private saveGridData(): void {
    const data = JSON.stringify(this.gameState());
    localStorage.setItem(this.gameStateKey, data);
  }

  private getDayOfYear() {
    const today = new Date();
    const startOfYear = new Date(today.getFullYear(), 0, 0);
    const diff = today.getTime() - startOfYear.getTime();
    const oneDay = 1000 * 60 * 60 * 24;
    return Math.floor(diff / oneDay);
  }
}
