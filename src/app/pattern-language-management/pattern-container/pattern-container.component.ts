import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ComponentRegistryService } from 'src/app/core/service/component-registry.service';

@Component({
    selector: 'pp-pattern-container',
    templateUrl: './pattern-container.component.html',
    styleUrls: ['./pattern-container.component.scss']
})
export class PatternContainerComponent implements OnInit {

    plEncodedUri: string;
    pEncodedUri: string;

    // the list of registered renderer components for the language
    renderer: Array<any>;

    constructor(private activatedRoute: ActivatedRoute,
                private compRegistry: ComponentRegistryService) {
    }

    ngOnInit() {
        this.plEncodedUri = this.activatedRoute.snapshot.paramMap.get('plEncodedUri');
        this.renderer = this.compRegistry.getRenderingComponents(this.plEncodedUri);
    }

}
