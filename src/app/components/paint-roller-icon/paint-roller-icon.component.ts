import { Component, input } from '@angular/core';

@Component({
  selector: 'app-paint-roller-icon',
  imports: [],
  templateUrl: './paint-roller-icon.component.html',
  styleUrl: './paint-roller-icon.component.css'
})
export class PaintRollerIconComponent {
  color = input("black");
}
