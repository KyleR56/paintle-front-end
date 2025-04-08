import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaintPatternDisplayComponent } from './paint-pattern-display.component';

describe('PaintPatternDisplayComponent', () => {
  let component: PaintPatternDisplayComponent;
  let fixture: ComponentFixture<PaintPatternDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaintPatternDisplayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaintPatternDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
