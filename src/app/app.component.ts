import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GameBoardComponent } from './game-board/game-board.component';
import { PuzzleDisplayComponent } from "./puzzle-display/puzzle-display.component";
import { HeaderComponent } from "./header/header.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, GameBoardComponent, PuzzleDisplayComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'triadle-front-end';
}
