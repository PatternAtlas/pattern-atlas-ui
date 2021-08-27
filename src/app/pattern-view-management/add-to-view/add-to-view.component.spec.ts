import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddToViewComponent } from './add-to-view.component';

describe('AddToViewComponent', () => {
  let component: AddToViewComponent;
  let fixture: ComponentFixture<AddToViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddToViewComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddToViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
