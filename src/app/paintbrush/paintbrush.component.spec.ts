import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaintbrushComponent } from './paintbrush.component';

describe('PaintbrushComponent', () => {
  let component: PaintbrushComponent;
  let fixture: ComponentFixture<PaintbrushComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaintbrushComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaintbrushComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
