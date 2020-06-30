import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignModelManagementComponent } from './design-model-management.component';
import { DesignModelTestModule } from '../../design-model.test.module';

describe('DesignModelManagementComponent', () => {
  let component: DesignModelManagementComponent;
  let fixture: ComponentFixture<DesignModelManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [DesignModelTestModule],
      declarations: [DesignModelManagementComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DesignModelManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
