import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterpriseIntegrationPatternComponent } from './enterprise-integration-pattern.component';

describe('EnterpriseIntegrationPatternComponent', () => {
  let component: EnterpriseIntegrationPatternComponent;
  let fixture: ComponentFixture<EnterpriseIntegrationPatternComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnterpriseIntegrationPatternComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnterpriseIntegrationPatternComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
