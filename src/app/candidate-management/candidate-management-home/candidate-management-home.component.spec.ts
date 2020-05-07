import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateManagementHomeComponent } from './candidate-management-home.component';

describe('CandidateManagementHomeComponent', () => {
  let component: CandidateManagementHomeComponent;
  let fixture: ComponentFixture<CandidateManagementHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CandidateManagementHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidateManagementHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
