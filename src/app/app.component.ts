import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GameBoardComponent } from './game-board/game-board.component';
import { PuzzleDisplayComponent } from "./puzzle-display/puzzle-display.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, GameBoardComponent, PuzzleDisplayComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'triadle-front-end';
}
