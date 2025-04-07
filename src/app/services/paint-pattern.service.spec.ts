import { TestBed } from '@angular/core/testing';

import { PaintPatternService } from './paint-pattern.service';

describe('PaintPatternService', () => {
  let service: PaintPatternService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaintPatternService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
