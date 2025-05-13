import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ColorService {
  // Constants
  private readonly COLORS: readonly string[] = ['red', 'orange', 'yellow', 'green', 'blue'];
  private readonly DEFAULT_COLOR: string = 'white';
  private readonly EMOJIS: readonly string[] = ['🟥', '🟧', '🟨', '🟩', '🟦'];

  // Public readonly values
  readonly colors: readonly string[] = this.COLORS;
  readonly defaultColor: string = this.DEFAULT_COLOR;
  readonly emojis: readonly string[] = this.EMOJIS;

  // Internal map
  private readonly colorToEmojiMap: Readonly<Record<string, string>>;

  constructor() {
    this.colorToEmojiMap = Object.fromEntries(
      this.COLORS.map((color, index) => [color, this.EMOJIS[index]])
    );
  }

  /**
   * Retrieves the emoji corresponding to the given color.
   * Returns an empty string if no match is found.
   */
  getColorEmoji(color: string): string {
    return this.colorToEmojiMap[color] ?? '';
  }
}
