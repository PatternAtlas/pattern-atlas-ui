import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ComponentRegistryService } from 'src/app/core/service/component-registry.service';

@Component({
    selector: 'pp-pattern-container',
    templateUrl: './pattern-container.component.html',
    styleUrls: ['./pattern-container.component.scss']
})
export class PatternContainerComponent implements OnInit {

    plId: string;
    pId: string;

    // the list of registered renderer components for the language
    renderer: Array<any>;

    constructor(private route: ActivatedRoute,
      private compRegistry: ComponentRegistryService) {
    }

    ngOnInit() {
        this.plId = this.route.snapshot.params['plid'];
        this.pId = this.route.snapshot.params['pid'];
        this.renderer = this.compRegistry.getRenderingComponents(this.plId);
    }

}
