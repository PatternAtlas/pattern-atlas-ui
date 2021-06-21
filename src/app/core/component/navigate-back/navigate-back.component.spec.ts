import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigateBackComponent } from './navigate-back.component';

describe('NavigateBackComponent', () => {
  let component: NavigateBackComponent;
  let fixture: ComponentFixture<NavigateBackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NavigateBackComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigateBackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
