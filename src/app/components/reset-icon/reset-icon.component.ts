import { Component, input } from '@angular/core';

@Component({
  selector: 'app-reset-icon',
  imports: [],
  templateUrl: './reset-icon.component.html',
  styleUrl: './reset-icon.component.css'
})
export class ResetIconComponent {
  color = input("black");
}
