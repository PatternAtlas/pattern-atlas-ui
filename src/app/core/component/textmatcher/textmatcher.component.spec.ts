import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextmatcherComponent } from './textmatcher.component';

describe('TextmatcherComponent', () => {
  let component: TextmatcherComponent;
  let fixture: ComponentFixture<TextmatcherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextmatcherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextmatcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
