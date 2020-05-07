import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IssueManagementHomeDetailComponent } from './issue-management-home-detail.component';

describe('IssueManagementHomeDetailComponent', () => {
  let component: IssueManagementHomeDetailComponent;
  let fixture: ComponentFixture<IssueManagementHomeDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IssueManagementHomeDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IssueManagementHomeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
