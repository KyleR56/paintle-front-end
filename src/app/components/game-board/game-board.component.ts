import { Component, inject, signal } from '@angular/core';
import { GameStateService, GameState } from '../../services/game-state.service';
import { ColorService } from '../../services/color.service';
import { PaintPatternService } from '../../services/paint-pattern.service';
import { PaintRollerIconComponent } from '../paint-roller-icon/paint-roller-icon.component';
import { ResetIconComponent } from "../reset-icon/reset-icon.component";
import { ToastrService } from 'ngx-toastr';
import confetti from 'canvas-confetti';

@Component({
  selector: 'app-game-board',
  imports: [PaintRollerIconComponent, ResetIconComponent],
  templateUrl: './game-board.component.html',
  styleUrl: './game-board.component.css'
})
export class GameBoardComponent {
  private gameStateService = inject(GameStateService);
  gameState = this.gameStateService.gameState;

  private colorService = inject(ColorService);
  colors = this.colorService.colors;
  size = this.colors().length

  private paintPatternService = inject(PaintPatternService);
  paintPattern = this.paintPatternService.paintPattern;

  private toastr = inject(ToastrService);

  /**
   * Paints the given row with the given color.
   */
  fillRow(row: number, color: string): void {
    const hasWon = this.gameState().hasWon;
    this.gameStateService.fillRow(row, color);
    if (this.gameState().hasWon != hasWon) {
      this.showWin();
    }
  }

  /**
   * Paints the given column with the given color.
   */
  fillColumn(col: number, color: string): void {
    const hasWon = this.gameState().hasWon;
    this.gameStateService.fillColumn(col, color);
    if (this.gameState().hasWon != hasWon) {
      this.showWin();
    }
  }

  /**
   * Resets to the starting game state by clearing the board.
   */
  clear(): void {
    this.gameStateService.clearBoard();
  }

  private showWin(): void {
    this.toastr.success('You Win!', '', {
      positionClass: 'toast-custom-center',
      timeOut: 2000
    });

    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  }
}
