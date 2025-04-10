import { TestBed } from '@angular/core/testing';

import { DayOfYearService } from './day-of-year.service';

describe('DayOfYearService', () => {
  let service: DayOfYearService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DayOfYearService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
