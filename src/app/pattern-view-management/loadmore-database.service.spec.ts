import { TestBed } from '@angular/core/testing';

import { LoadmoreDatabaseService } from './loadmore-database.service';

describe('LoadmoreDatabaseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LoadmoreDatabaseService = TestBed.get(LoadmoreDatabaseService);
    expect(service).toBeTruthy();
  });
});
