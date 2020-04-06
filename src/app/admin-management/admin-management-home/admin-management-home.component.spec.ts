import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminManagementHomeComponent } from './admin-management-home.component';

describe('AdminManagementHomeComponent', () => {
  let component: AdminManagementHomeComponent;
  let fixture: ComponentFixture<AdminManagementHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminManagementHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminManagementHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
