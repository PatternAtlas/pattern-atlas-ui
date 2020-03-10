import { TestBed } from '@angular/core/testing';

import { AlgorithmDetectionService } from './algorithm-detection.service';

describe('AlgorithmDetectionService', () => {
  let service: AlgorithmDetectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlgorithmDetectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
