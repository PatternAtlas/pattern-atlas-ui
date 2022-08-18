import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RatingMultipleComponent } from './rating-multiple.component';

describe('RatingMultipleComponent', () => {
  let component: RatingMultipleComponent;
  let fixture: ComponentFixture<RatingMultipleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RatingMultipleComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RatingMultipleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
