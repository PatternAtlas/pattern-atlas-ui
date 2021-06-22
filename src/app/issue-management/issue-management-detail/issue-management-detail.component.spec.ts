import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IssueManagementDetailComponent } from './issue-management-detail.component';

describe('IssueManagementDetailComponent', () => {
  let component: IssueManagementDetailComponent;
  let fixture: ComponentFixture<IssueManagementDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [IssueManagementDetailComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IssueManagementDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
