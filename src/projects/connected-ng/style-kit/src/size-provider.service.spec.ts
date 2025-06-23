import { TestBed } from '@angular/core/testing';

import { SizeProviderService } from './size-provider.service';

describe('SizeProviderService', () => {
  let service: SizeProviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SizeProviderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
