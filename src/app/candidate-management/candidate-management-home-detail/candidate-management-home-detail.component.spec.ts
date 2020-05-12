import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateManagementHomeDetailComponent } from './candidate-management-home-detail.component';

describe('CandidateManagementHomeDetailComponent', () => {
  let component: CandidateManagementHomeDetailComponent;
  let fixture: ComponentFixture<CandidateManagementHomeDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CandidateManagementHomeDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidateManagementHomeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
