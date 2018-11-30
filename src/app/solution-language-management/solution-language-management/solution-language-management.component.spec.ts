import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SolutionLanguageManagementComponent } from './solution-language-management.component';

describe('SolutionLanguageManagementComponent', () => {
  let component: SolutionLanguageManagementComponent;
  let fixture: ComponentFixture<SolutionLanguageManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SolutionLanguageManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolutionLanguageManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
