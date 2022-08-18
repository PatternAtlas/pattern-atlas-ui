import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatternLanguagePickerComponent } from './pattern-language-picker.component';

describe('PatternLanguagePickerComponent', () => {
  let component: PatternLanguagePickerComponent;
  let fixture: ComponentFixture<PatternLanguagePickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatternLanguagePickerComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatternLanguagePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
