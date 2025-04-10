import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WinMessageComponent } from './win-message.component';

describe('WinMessageComponent', () => {
  let component: WinMessageComponent;
  let fixture: ComponentFixture<WinMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WinMessageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WinMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
