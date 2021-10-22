import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionButtonBarComponent } from './action-button-bar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('ActionButtonBarComponent', () => {
  let component: ActionButtonBarComponent;
  let fixture: ComponentFixture<ActionButtonBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ActionButtonBarComponent],
      imports: [MatToolbarModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]

    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionButtonBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
