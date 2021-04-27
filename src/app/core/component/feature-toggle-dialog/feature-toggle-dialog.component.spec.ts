import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {FeatureToggleDialogComponent} from './feature-toggle-dialog.component';

describe('FeatureToggleDialogComponent', () => {
  let component: FeatureToggleDialogComponent;
  let fixture: ComponentFixture<FeatureToggleDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FeatureToggleDialogComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeatureToggleDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
