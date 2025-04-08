import { Component } from '@angular/core';
import { PaintPatternDisplayComponent } from '../components/paint-pattern-display/paint-pattern-display.component';
import { GameBoardComponent } from '../components/game-board/game-board.component';

@Component({
  selector: 'app-home',
  imports: [PaintPatternDisplayComponent, GameBoardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
