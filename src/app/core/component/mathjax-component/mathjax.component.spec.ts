import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MathjaxComponentComponent } from './mathjax.component';

describe('MathjaxComponentComponent', () => {
  let component: MathjaxComponentComponent;
  let fixture: ComponentFixture<MathjaxComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MathjaxComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MathjaxComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
