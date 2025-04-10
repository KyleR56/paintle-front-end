import { Component, inject } from '@angular/core';
import { GameStateService } from '../../services/game-state.service';

@Component({
  selector: 'app-win-message',
  imports: [],
  templateUrl: './win-message.component.html',
  styleUrl: './win-message.component.css'
})
export class WinMessageComponent {
  private gameStateService = inject(GameStateService);
  hasWon = () => this.gameStateService.gameState().hasWon;
}
