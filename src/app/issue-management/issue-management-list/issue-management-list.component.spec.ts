import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IssueManagementListComponent } from './issue-management-list.component';

describe('IssueManagementListComponent', () => {
  let component: IssueManagementListComponent;
  let fixture: ComponentFixture<IssueManagementListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [IssueManagementListComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IssueManagementListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
