import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminManagementDetailComponent } from './admin-management-detail.component';

describe('AdminManagementDetailComponent', () => {
  let component: AdminManagementDetailComponent;
  let fixture: ComponentFixture<AdminManagementDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdminManagementDetailComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminManagementDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
