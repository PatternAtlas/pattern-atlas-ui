import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SelectPatternDialogComponent} from './select-pattern-dialog.component';

describe('SelectPatternDialogComponent', () => {
  let component: SelectPatternDialogComponent;
  let fixture: ComponentFixture<SelectPatternDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SelectPatternDialogComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectPatternDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
