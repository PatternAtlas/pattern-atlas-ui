import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IssueCreateDialogComponent } from './issue-create-dialog.component';

describe('IssueCreateDialogComponent', () => {
  let component: IssueCreateDialogComponent;
  let fixture: ComponentFixture<IssueCreateDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IssueCreateDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IssueCreateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
