import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardRendererComponent } from './card-renderer.component';

describe('CardRendererComponent', () => {
  let component: CardRendererComponent;
  let fixture: ComponentFixture<CardRendererComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CardRendererComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
