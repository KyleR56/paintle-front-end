import { Component, inject, Signal } from '@angular/core';
import { GameStateService } from '../../services/game-state.service';

@Component({
  selector: 'app-move-counter',
  imports: [],
  templateUrl: './move-counter.component.html',
  styleUrl: './move-counter.component.css'
})
export class MoveCounterComponent {
  // Services
  private readonly gameStateService = inject(GameStateService);

  // Signals
  readonly moves: Signal<number> = this.gameStateService.moves;
}
