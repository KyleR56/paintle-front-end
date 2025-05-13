import { Component, inject, Signal } from '@angular/core';
import { PaintPatternService } from '../../services/paint-pattern.service';

@Component({
  selector: 'app-paint-pattern-display',
  imports: [],
  templateUrl: './paint-pattern-display.component.html',
  styleUrl: './paint-pattern-display.component.css'
})
export class PaintPatternDisplayComponent {
  // Services
  private readonly paintPatternService = inject(PaintPatternService);

  // Signals
  readonly paintPattern: Signal<string[][]> = this.paintPatternService.paintPattern;
}
