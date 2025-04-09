import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaintRollerIconComponent } from './paint-roller-icon.component';

describe('PaintRollerIconComponent', () => {
  let component: PaintRollerIconComponent;
  let fixture: ComponentFixture<PaintRollerIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaintRollerIconComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaintRollerIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
