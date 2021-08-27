import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeveloperManagementListComponent } from './developer-management-list.component';

describe('DeveloperManagementListComponent', () => {
  let component: DeveloperManagementListComponent;
  let fixture: ComponentFixture<DeveloperManagementListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DeveloperManagementListComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeveloperManagementListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
