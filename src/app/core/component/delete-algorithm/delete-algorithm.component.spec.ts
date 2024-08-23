import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteAlgorithmComponent } from './delete-algorithm.component';

describe('DeleteAlgorithmComponent', () => {
  let component: DeleteAlgorithmComponent;
  let fixture: ComponentFixture<DeleteAlgorithmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteAlgorithmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteAlgorithmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
