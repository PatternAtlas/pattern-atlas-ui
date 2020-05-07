import { TestBed } from '@angular/core/testing';

import { CandidateManagementService } from './candidate-management.service';

describe('CandidateManagementService', () => {
  let service: CandidateManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CandidateManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
