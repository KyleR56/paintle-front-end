import { Component, input, InputSignal } from '@angular/core';

@Component({
  selector: 'app-paint-roller-icon',
  imports: [],
  templateUrl: './paint-roller-icon.component.html',
  styleUrl: './paint-roller-icon.component.css'
})
export class PaintRollerIconComponent {
  readonly color: InputSignal<string> = input("black");
}
