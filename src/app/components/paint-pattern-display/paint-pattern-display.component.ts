import { Component, inject, OnInit, signal } from '@angular/core';
import { PaintPatternService } from '../../services/paint-pattern.service';

@Component({
  selector: 'app-paint-pattern-display',
  imports: [],
  templateUrl: './paint-pattern-display.component.html',
  styleUrl: './paint-pattern-display.component.css'
})
export class PaintPatternDisplayComponent implements OnInit {
  paintPatternService = inject(PaintPatternService);
  paintPattern = signal<string[][]>([[]]);

  ngOnInit(): void {
    this.paintPattern.set(this.paintPatternService.paintPattern);
  }
}
