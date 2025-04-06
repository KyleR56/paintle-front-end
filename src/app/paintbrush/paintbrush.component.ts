import { Component, input } from '@angular/core';

@Component({
  selector: 'app-paintbrush',
  imports: [],
  templateUrl: './paintbrush.component.html',
  styleUrl: './paintbrush.component.css'
})
export class PaintbrushComponent {
  position = input.required<number>();
  direction = input.required<String>();
}
