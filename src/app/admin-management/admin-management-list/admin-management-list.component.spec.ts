import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminManagementListComponent } from './admin-management-list.component';

describe('AdminManagementListComponent', () => {
  let component: AdminManagementListComponent;
  let fixture: ComponentFixture<AdminManagementListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminManagementListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminManagementListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
