import { AfterViewInit, Component, ElementRef, inject, OnDestroy, signal, Signal } from '@angular/core';
import { GameStateService } from '../../services/game-state.service';
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
export class GameBoardComponent implements AfterViewInit, OnDestroy {
  // Services
  private readonly gameStateService = inject(GameStateService);
  private readonly colorService = inject(ColorService);
  private readonly paintPatternService = inject(PaintPatternService);
  private readonly toastr = inject(ToastrService);

  // Signals
  readonly board: Signal<string[][]> = this.gameStateService.board;
  readonly isGameWon: Signal<boolean> = this.gameStateService.isGameWon;
  readonly paintPattern: Signal<string[][]> = this.paintPatternService.paintPattern;

  // Derived values
  readonly colors: readonly string[] = this.colorService.colors;
  readonly size: number = this.colors.length;

  // For dynamic sizing
  private readonly hostRef = inject(ElementRef);
  private readonly resizeObserver = new ResizeObserver(() => this.resizeComponent());
  readonly gridWidth = signal(0);
  readonly gridHeight = signal(0);

  ngAfterViewInit() {
    this.resizeObserver.observe(this.hostRef.nativeElement);
    this.resizeComponent();
  }

  ngOnDestroy() {
    this.resizeObserver.unobserve(this.hostRef.nativeElement);
  }

  resizeComponent() {
    const aspectRatio = (this.size + 2) / (this.size + 1);

    const hostElement = this.hostRef.nativeElement as HTMLElement;
    const { width: hostWidth, height: hostHeight } = hostElement.getBoundingClientRect();

    const widthBasedHeight = hostWidth / aspectRatio;
    const heightBasedWidth = hostHeight * aspectRatio;

    if (widthBasedHeight <= hostHeight) {
      this.gridWidth.set(hostWidth);
      this.gridHeight.set(widthBasedHeight);
    } else {
      this.gridWidth.set(heightBasedWidth);
      this.gridHeight.set(hostHeight);
    }
  }

  /**
   * Paints the specified row with the given color and checks for a win condition.
   */
  paintRow(row: number, color: string): void {
    const wasGameWon = this.isGameWon();
    this.gameStateService.paintRow(row, color);
    if (this.isGameWon() != wasGameWon) {
      this.showWin();
    }
  }

  /**
   * Paints the specified column with the given color and checks for a win condition.
   */
  paintColumn(row: number, color: string): void {
    const wasGameWon = this.isGameWon();
    this.gameStateService.paintColumn(row, color);
    if (this.isGameWon() != wasGameWon) {
      this.showWin();
    }
  }

  /**
   * Resets the game board to its initial state.
   */
  resetBoard(): void {
    this.gameStateService.resetBoard();
  }

  private showWin(): void {
    this.toastr.success('You Win!', undefined, {
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
