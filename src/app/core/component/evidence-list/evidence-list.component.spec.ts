import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EvidenceListComponent } from './evidence-list.component';

describe('EvidenceListComponent', () => {
  let component: EvidenceListComponent;
  let fixture: ComponentFixture<EvidenceListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EvidenceListComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EvidenceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
