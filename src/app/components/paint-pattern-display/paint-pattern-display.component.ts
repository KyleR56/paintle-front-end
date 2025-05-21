import { AfterViewInit, Component, ElementRef, inject, OnDestroy, signal, Signal } from '@angular/core';
import { PaintPatternService } from '../../services/paint-pattern.service';

@Component({
  selector: 'app-paint-pattern-display',
  imports: [],
  templateUrl: './paint-pattern-display.component.html',
  styleUrl: './paint-pattern-display.component.css'
})
export class PaintPatternDisplayComponent implements AfterViewInit, OnDestroy{
  // Services
  private readonly paintPatternService = inject(PaintPatternService);

  // Signals
  readonly paintPattern: Signal<string[][]> = this.paintPatternService.paintPattern;

  // For dynamic sizing
  private readonly hostRef = inject(ElementRef);
  private readonly resizeObserver = new ResizeObserver(() => this.resizeComponent());
  readonly width = signal(0);
  readonly height = signal(0);

  ngAfterViewInit() {
    this.resizeObserver.observe(this.hostRef.nativeElement);
    this.resizeComponent();
  }

  ngOnDestroy() {
    this.resizeObserver.unobserve(this.hostRef.nativeElement);
  }

  resizeComponent() {
    const hostElement = this.hostRef.nativeElement as HTMLElement;
    const { width: hostWidth, height: hostHeight } = hostElement.getBoundingClientRect();
    this.width.set(Math.min(hostWidth, hostHeight));
    this.height.set(Math.min(hostWidth, hostHeight));
  }
}
