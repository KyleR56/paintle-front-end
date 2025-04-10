import { Component, inject } from '@angular/core';
import { PaintPatternService } from '../../services/paint-pattern.service';

@Component({
  selector: 'app-paint-pattern-display',
  imports: [],
  templateUrl: './paint-pattern-display.component.html',
  styleUrl: './paint-pattern-display.component.css'
})
export class PaintPatternDisplayComponent {
  private paintPatternService = inject(PaintPatternService);
  paintPattern = this.paintPatternService.paintPattern;
}
