import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ColorService {
  colors = signal(['red', 'orange', 'yellow', 'green', 'blue']);
  defaultColor = signal('white');
}
