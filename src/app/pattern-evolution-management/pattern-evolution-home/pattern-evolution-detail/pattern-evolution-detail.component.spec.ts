import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatternEvolutionDetailComponent } from './pattern-evolution-detail.component';

describe('PatternEvolutionDetailComponent', () => {
  let component: PatternEvolutionDetailComponent;
  let fixture: ComponentFixture<PatternEvolutionDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatternEvolutionDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatternEvolutionDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
