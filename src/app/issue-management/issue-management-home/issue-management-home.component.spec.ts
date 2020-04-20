import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IssueManagementHomeComponent } from './issue-management-home.component';

describe('IssueManagementHomeComponent', () => {
  let component: IssueManagementHomeComponent;
  let fixture: ComponentFixture<IssueManagementHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IssueManagementHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IssueManagementHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
