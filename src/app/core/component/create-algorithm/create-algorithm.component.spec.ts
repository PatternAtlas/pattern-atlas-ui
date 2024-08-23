import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAlgorithmComponent } from './create-algorithm.component';

describe('CreateAlgorithmComponent', () => {
  let component: CreateAlgorithmComponent;
  let fixture: ComponentFixture<CreateAlgorithmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateAlgorithmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAlgorithmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
