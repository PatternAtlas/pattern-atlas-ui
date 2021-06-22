import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessOauthCallbackComponent } from './process-oauth-callback.component';

describe('ProcessOauthCallbackComponent', () => {
  let component: ProcessOauthCallbackComponent;
  let fixture: ComponentFixture<ProcessOauthCallbackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProcessOauthCallbackComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessOauthCallbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
