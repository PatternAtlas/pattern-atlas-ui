import { TestBed } from '@angular/core/testing';

import { IssueManagementService } from './issue-management.service';

describe('IssueManagementService', () => {
  let service: IssueManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IssueManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
