import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'pp-pattern-container',
    templateUrl: './pattern-container.component.html',
    styleUrls: ['./pattern-container.component.scss']
})
export class PatternContainerComponent implements OnInit {

    plId: string;
    pId: string;

    constructor(private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.plId = this.route.snapshot.params['plid'];
        this.pId = this.route.snapshot.params['pid'];
    }

}
