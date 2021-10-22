import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreativeLicenseFooterComponent } from './creative-license-footer.component';

describe('CreativeLicenseFooterComponent', () => {
  let component: CreativeLicenseFooterComponent;
  let fixture: ComponentFixture<CreativeLicenseFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CreativeLicenseFooterComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreativeLicenseFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
