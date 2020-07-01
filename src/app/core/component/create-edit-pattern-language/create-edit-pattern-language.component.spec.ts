import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditPatternLanguageComponent } from './create-edit-pattern-language.component';

describe('CreateEditPatternLanguageComponent', () => {
  let component: CreateEditPatternLanguageComponent;
  let fixture: ComponentFixture<CreateEditPatternLanguageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CreateEditPatternLanguageComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEditPatternLanguageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
