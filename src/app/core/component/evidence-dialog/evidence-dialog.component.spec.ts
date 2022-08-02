import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EvidenceDialogComponent } from './evidence-dialog.component';

describe('EvidenceDialogComponent', () => {
  let component: EvidenceDialogComponent;
  let fixture: ComponentFixture<EvidenceDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EvidenceDialogComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EvidenceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
