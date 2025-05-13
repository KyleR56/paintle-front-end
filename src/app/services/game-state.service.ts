import { computed, inject, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { ColorService } from './color.service';
import { PaintPatternService } from './paint-pattern.service';
import { DateService } from './date.service';

interface GameState {
  day: number;
  month: number;
  board: string[][];
  isGameWon: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class GameStateService {
  // Public derived signals
  readonly board: Signal<string[][]> = computed(() => this._gameState().board);
  readonly isGameWon: Signal<boolean> = computed(() => this._gameState().isGameWon);

  // Internal state
  private readonly _gameState: WritableSignal<GameState>;

  // Services
  private readonly colorService = inject(ColorService);
  private readonly paintPatternService = inject(PaintPatternService);
  private readonly dateService = inject(DateService);

  // Derived values
  private readonly colors: readonly string[] = this.colorService.colors;
  private readonly defaultColor: string = this.colorService.defaultColor;
  private readonly paintPattern: Signal<string[][]> = this.paintPatternService.paintPattern;
  private readonly day: number = this.dateService.day;
  private readonly month: number = this.dateService.month;

  // Constants
  private readonly GAME_STATE_KEY = 'gameState';

  constructor() {
    let initialState: GameState | null = null;

    // Attempt to load saved game state from local storage
    const data = localStorage.getItem(this.GAME_STATE_KEY);
    if (data) {
      const gameState = JSON.parse(data) as GameState;
      if (gameState.day == this.day && gameState.month == this.month) {
        initialState = gameState;
      }
    }

    // If no valid saved state, initialize a fresh game state
    if (initialState === null) {
      const size = this.colors.length;
      const initialBoard = new Array(size)
        .fill(null)
        .map(() => new Array(size).fill(this.defaultColor));
      initialState = {
        day: this.day,
        month: this.month,
        board: initialBoard,
        isGameWon: false
      };
    }

    this._gameState = signal(initialState);
  }

  /**
   * Paints an entire row with the given color.
   * Skips update if the game is already won.
   * Updates the board state and checks for win condition.
   */
  paintRow(row: number, color: string): void {
    this._gameState.update(state => {
      if (state.isGameWon) {
        return state;
      }
      
      const newBoard = state.board.map(row => [...row]);

      for (let col = 0; col < newBoard.length; col++) {
        newBoard[row][col] = color;
      }

      let newIsGameWon = false;
      if (this.paintPattern().length > 0) {
        newIsGameWon = true;
        for (let row = 0; row < newBoard.length; row++) {
          for (let col = 0; col < newBoard.length; col++) {
            if (newBoard[row][col] != this.paintPattern()[row][col]) {
              newIsGameWon = false;
            }   
          }
        }
      }

      return { ...state, board: newBoard, isGameWon: newIsGameWon };
    });

    this.saveGameState();
  }

  /**
   * Paints an entire column with the given color.
   * Skips update if the game is already won.
   * Updates the board state and checks for win condition.
   */
  paintColumn(col: number, color: string): void {
    this._gameState.update(state => {
      if (state.isGameWon) {
        return state;
      }
      
      const newBoard = state.board.map(row => [...row]);

      for (let row = 0; row < newBoard.length; row++) {
        newBoard[row][col] = color;
      }

      let newIsGameWon = false;
      if (this.paintPattern().length > 0) {
        newIsGameWon = true;
        for (let row = 0; row < newBoard.length; row++) {
          for (let col = 0; col < newBoard.length; col++) {
            if (newBoard[row][col] != this.paintPattern()[row][col]) {
              newIsGameWon = false;
            }   
          }
        }
      }

      return { ...state, board: newBoard, isGameWon: newIsGameWon };
    });

    this.saveGameState();
  }

  /**
   * Resets the game board by filling it with the default color.
   * Skips update if the game is already won.
   */
  resetBoard(): void {
    this._gameState.update(state => {
      if (state.isGameWon) {
        return state;
      }
      
      const size = this.colorService.colors.length;
      const newBoard = new Array(size)
        .fill(null)
        .map(() => new Array(size).fill(this.defaultColor));

      return { ...state, board: newBoard };
    });

    this.saveGameState();
  }

  private saveGameState(): void {
    const data = JSON.stringify(this._gameState());
    localStorage.setItem(this.GAME_STATE_KEY, data);
  }
}
