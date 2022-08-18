import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorPickerComponent } from './author-picker.component';

describe('AuthorPickerComponent', () => {
  let component: AuthorPickerComponent;
  let fixture: ComponentFixture<AuthorPickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthorPickerComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
