import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscussDialogComponent } from './discuss-dialog.component';

describe('DiscussDialogComponent', () => {
  let component: DiscussDialogComponent;
  let fixture: ComponentFixture<DiscussDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DiscussDialogComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscussDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
