import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatternEvolutionCreateDialogComponent } from './pattern-evolution-create-dialog.component';

describe('PatternEvolutionCreateDialogComponent', () => {
  let component: PatternEvolutionCreateDialogComponent;
  let fixture: ComponentFixture<PatternEvolutionCreateDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatternEvolutionCreateDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatternEvolutionCreateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
