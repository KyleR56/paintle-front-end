import { Component } from '@angular/core';
import { PaintPatternDisplayComponent } from '../components/paint-pattern-display/paint-pattern-display.component';
import { GameBoardComponent } from '../components/game-board/game-board.component';
import { WinMessageComponent } from "../components/win-message/win-message.component";

@Component({
  selector: 'app-home',
  imports: [PaintPatternDisplayComponent, GameBoardComponent, WinMessageComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
