import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatternEvolutionHomeComponent } from './pattern-evolution-home.component';

describe('PatternEvolutionHomeComponent', () => {
  let component: PatternEvolutionHomeComponent;
  let fixture: ComponentFixture<PatternEvolutionHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatternEvolutionHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatternEvolutionHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
