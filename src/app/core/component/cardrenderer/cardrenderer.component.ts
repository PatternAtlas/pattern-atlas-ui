import {Component, EventEmitter, Input, NgZone, OnInit, Output} from '@angular/core';
import {UriConverter} from '../../util/uri-converter';
import {ActivatedRoute, Router} from '@angular/router';
import UriEntity from '../../model/hal/uri-entity.model';
import Pattern from '../../model/hal/pattern.model';
import {HalLink} from '../../model/hal/hal-link.interface';

@Component({
    selector: 'pp-cardrenderer',
    templateUrl: './cardrenderer.component.html',
    styleUrls: ['./cardrenderer.component.scss']
})
export class CardrendererComponent implements OnInit {

    constructor(private zone: NgZone,
                private router: Router,
                private activatedRoute: ActivatedRoute) {
    }

    @Input() uriEntities: Pattern[];

    @Output() createEntityClicked: EventEmitter<void> = new EventEmitter<void>();

    ngOnInit() {
    }

    navigate(pattern: UriEntity): void {
        this.zone.run(() => {
            this.router.navigate([UriConverter.doubleEncodeUri(pattern.uri)], {relativeTo: this.activatedRoute});
        });
    }


    getLinkCount(directedEdges: HalLink[] | HalLink) {
        if (!directedEdges) {
            return 0;
        }
        return Array.isArray(directedEdges) ? directedEdges.length : 1;
    }


}
