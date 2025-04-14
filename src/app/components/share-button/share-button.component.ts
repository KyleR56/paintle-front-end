import { Component, inject } from '@angular/core';
import { GameStateService } from '../../services/game-state.service';
import { DateService } from '../../services/date.service';
import { Clipboard } from '@angular/cdk/clipboard';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-share-button',
  imports: [],
  templateUrl: './share-button.component.html',
  styleUrl: './share-button.component.css'
})
export class ShareButtonComponent {
  private gameStateService = inject(GameStateService);
  gameState = this.gameStateService.gameState;

  private clipboard = inject(Clipboard);

  private toastr = inject(ToastrService);

  private colorToEmoji: { [key: string]: string } = {
    "red": "🟥",
    "orange": "🟧",
    "yellow": "🟨",
    "green": "🟩",
    "blue": "🟦"
  };

  copyShareMessage(): void {
    let message = `Paintle ${this.gameState().month}/${this.gameState().day}\n\n`;
    this.gameState().board.forEach(row => {
      row.forEach(color => {
        message += this.colorToEmoji[color];
      });
      message += "\n";
    });
    message += "https://paintle.net";

    this.clipboard.copy(message);

    this.showCopied();
  }

  private showCopied(): void {
    this.toastr.info('Copied to clipboard', '', {
      positionClass: 'toast-custom-center',
      timeOut: 2000
    });
  }
}
