import { TestBed } from '@angular/core/testing';

import { ChartUtilitiesService } from './chart-utilities.service';

describe('ChartUtilitiesService', () => {
  let service: ChartUtilitiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChartUtilitiesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
