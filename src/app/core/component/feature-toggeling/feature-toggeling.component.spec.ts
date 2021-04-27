import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {FeatureToggelingComponent} from './feature-toggeling.component';

describe('FeatureToggelingComponent', () => {
  let component: FeatureToggelingComponent;
  let fixture: ComponentFixture<FeatureToggelingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FeatureToggelingComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeatureToggelingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
