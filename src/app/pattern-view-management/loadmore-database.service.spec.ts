import { TestBed } from '@angular/core/testing';

import { LoadmoreDatabase } from './loadmore-database.service';

describe('LoadmoreDatabaseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LoadmoreDatabase = TestBed.inject(LoadmoreDatabase);
    expect(service).toBeTruthy();
  });
});
