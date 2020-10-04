import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignModelRendererComponent } from './design-model-renderer.component';
import { DesignModelTestModule } from '../../design-model.test.module';

describe('DesignModelRendererComponent', () => {
  let component: DesignModelRendererComponent;
  let fixture: ComponentFixture<DesignModelRendererComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [DesignModelTestModule],
      declarations: [DesignModelRendererComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DesignModelRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
