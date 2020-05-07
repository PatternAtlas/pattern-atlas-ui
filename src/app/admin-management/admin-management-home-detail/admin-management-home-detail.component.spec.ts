import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminManagementHomeDetailComponent } from './admin-management-home-detail.component';

describe('AdminManagementHomeDetailComponent', () => {
  let component: AdminManagementHomeDetailComponent;
  let fixture: ComponentFixture<AdminManagementHomeDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminManagementHomeDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminManagementHomeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
