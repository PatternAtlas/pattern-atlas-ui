import { TestBed } from '@angular/core/testing';

import { PatternEvolutionService } from './pattern-evolution.service';

describe('PatternEvolutionService', () => {
  let service: PatternEvolutionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PatternEvolutionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
