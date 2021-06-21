import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePatternRelationComponent } from './create-pattern-relation.component';

describe('CreatePatternRelationComponent', () => {
  let component: CreatePatternRelationComponent;
  let fixture: ComponentFixture<CreatePatternRelationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CreatePatternRelationComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePatternRelationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
