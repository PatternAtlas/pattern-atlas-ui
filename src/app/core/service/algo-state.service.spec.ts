import { TestBed } from '@angular/core/testing';

import { AlgoStateService } from './algo-state.service';

describe('AlgoStateService', () => {
  let service: AlgoStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlgoStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
