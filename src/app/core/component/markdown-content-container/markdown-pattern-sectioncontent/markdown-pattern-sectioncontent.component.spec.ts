import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkdownPatternSectioncontentComponent } from './markdown-pattern-sectioncontent.component';

describe('MarkdownPatternSectioncontentComponent', () => {
  let component: MarkdownPatternSectioncontentComponent;
  let fixture: ComponentFixture<MarkdownPatternSectioncontentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarkdownPatternSectioncontentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarkdownPatternSectioncontentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
