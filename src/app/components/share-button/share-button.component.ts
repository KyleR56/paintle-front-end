import { Component, inject } from '@angular/core';
import { GameStateService } from '../../services/game-state.service';
import { DateService } from '../../services/date.service';
import { ColorService } from '../../services/color.service';
import { Clipboard } from '@angular/cdk/clipboard';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-share-button',
  imports: [],
  templateUrl: './share-button.component.html',
  styleUrl: './share-button.component.css'
})
export class ShareButtonComponent {
  // Services
  private readonly gameStateService = inject(GameStateService);
  private readonly dateService = inject(DateService);
  private readonly colorService = inject(ColorService);
  private readonly clipboard = inject(Clipboard);
  private readonly toastr = inject(ToastrService);

  // Derived signals
  readonly isGameWon = this.gameStateService.isGameWon;
  private readonly board = this.gameStateService.board;
  private readonly moves = this.gameStateService.moves;

  // Derived Values
  private readonly day = this.dateService.day;
  private readonly month = this.dateService.month;

  copyShareMessage(): void {
    let message = `Paintle ${this.month}/${this.day}\n\n`;
    this.board().forEach(row => {
      row.forEach(color => {
        message += this.colorService.getColorEmoji(color);
      });
      message += "\n";
    });
    message += `Moves made: ${this.moves()}\n`;
    message += "https://paintle.net";

    this.clipboard.copy(message);

    this.showCopied();
  }

  private showCopied(): void {
    this.toastr.info('Copied to clipboard', undefined, {
      positionClass: 'toast-custom-center',
      timeOut: 2000
    });
  }
}
