import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialoggraphComponent } from './dialoggraph.component';

describe('DialoggraphComponent', () => {
  let component: DialoggraphComponent;
  let fixture: ComponentFixture<DialoggraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialoggraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialoggraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
