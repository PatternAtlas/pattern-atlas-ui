import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateManagementListComponent } from './candidate-management-list.component';

describe('CandidateManagementListComponent', () => {
  let component: CandidateManagementListComponent;
  let fixture: ComponentFixture<CandidateManagementListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CandidateManagementListComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidateManagementListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
