import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkdownPatternSectionContentComponent } from './markdown-pattern-section-content.component';

describe('MarkdownPatternSectioncontentComponent', () => {
  let component: MarkdownPatternSectionContentComponent;
  let fixture: ComponentFixture<MarkdownPatternSectionContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MarkdownPatternSectionContentComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarkdownPatternSectionContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
