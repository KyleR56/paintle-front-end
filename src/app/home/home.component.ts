import { Component, inject } from '@angular/core';
import { PaintPatternDisplayComponent } from '../components/paint-pattern-display/paint-pattern-display.component';
import { GameBoardComponent } from '../components/game-board/game-board.component';
import { ShareButtonComponent } from "../components/share-button/share-button.component";
import { GameStateService } from '../services/game-state.service';

@Component({
  selector: 'app-home',
  imports: [PaintPatternDisplayComponent, GameBoardComponent, ShareButtonComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  private readonly gameStateService = inject(GameStateService);
  readonly isGameWon = this.gameStateService.isGameWon;
}
