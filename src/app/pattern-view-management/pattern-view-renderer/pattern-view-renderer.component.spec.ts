import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatternViewRendererComponent } from './pattern-view-renderer.component';

describe('PatternViewRendererComponent', () => {
  let component: PatternViewRendererComponent;
  let fixture: ComponentFixture<PatternViewRendererComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PatternViewRendererComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatternViewRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
