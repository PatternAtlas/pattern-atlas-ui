import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditUrlDialogComponent } from './edit-url-dialog.component';

describe('EditUrlDialogComponent', () => {
  let component: EditUrlDialogComponent;
  let fixture: ComponentFixture<EditUrlDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditUrlDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditUrlDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
