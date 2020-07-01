import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ComponentRegistryService } from 'src/app/core/service/component-registry.service';
import { globals } from '../../globals';

@Component({
  selector: 'pp-pattern-container',
  templateUrl: './pattern-container.component.html',
  styleUrls: ['./pattern-container.component.scss']
})
export class PatternContainerComponent implements OnInit {

  patternLanguageId: string;
  patternId: string;

  // the list of registered renderer components for the language
  renderer: Array<any>;

  constructor(private activatedRoute: ActivatedRoute,
              private compRegistry: ComponentRegistryService) {
  }

  ngOnInit() {
    this.patternLanguageId = this.activatedRoute.snapshot.paramMap.get(globals.pathConstants.patternLanguageId);
    this.renderer = this.compRegistry.getRenderingComponents(this.patternLanguageId);
  }
}
