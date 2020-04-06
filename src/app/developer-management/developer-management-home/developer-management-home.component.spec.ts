import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeveloperManagementHomeComponent } from './developer-management-home.component';

describe('DeveloperManagementHomeComponent', () => {
  let component: DeveloperManagementHomeComponent;
  let fixture: ComponentFixture<DeveloperManagementHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeveloperManagementHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeveloperManagementHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
