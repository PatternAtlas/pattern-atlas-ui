import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateManagementDetailComponent } from './candidate-management-detail.component';

describe('CandidateManagementDetailComponent', () => {
  let component: CandidateManagementDetailComponent;
  let fixture: ComponentFixture<CandidateManagementDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CandidateManagementDetailComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidateManagementDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
