import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePatternComponent } from './create-pattern.component';

describe('CreatePatternComponent', () => {
  let component: CreatePatternComponent;
  let fixture: ComponentFixture<CreatePatternComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CreatePatternComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePatternComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
