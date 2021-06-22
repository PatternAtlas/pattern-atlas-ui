import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletePatternRelationComponent } from './delete-pattern-relation.component';

describe('DeletePatternRelationComponent', () => {
  let component: DeletePatternRelationComponent;
  let fixture: ComponentFixture<DeletePatternRelationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DeletePatternRelationComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletePatternRelationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
