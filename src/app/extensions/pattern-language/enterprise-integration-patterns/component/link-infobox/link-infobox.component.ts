import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { EnterpriseIntegrationPatternsLinkInfoLoaderService } from '../../loader/enterprise-integration-patterns-link-info-loader.service';
import { IriConverter } from 'src/app/core/util/iri-converter';
import LinkInfo from '../../model/link-info';

@Component({
  selector: 'pp-link-infobox',
  templateUrl: './link-infobox.component.html',
  styleUrls: ['./link-infobox.component.scss']
})
export class LinkInfoboxComponent implements OnInit {

  // the id of the link
  @Input() linkId: string;

  linkInfo: LinkInfo;

  // gets called if a pattern within the infobox has been clicked, parameter is the corresponding id of the pattern
  @Output() onPatternClicked: EventEmitter<string>;

  constructor(private loader: EnterpriseIntegrationPatternsLinkInfoLoaderService) { }

  ngOnInit() {
    this.loadContent();
  }

  // loads the link informations from the triplestore with the id
  loadContent() {
    const uri = IriConverter.convertIdToIri(this.linkId);
    this.loader.loadContentFromStore(uri)
      .then(linkMap => {
        this.linkInfo = linkMap.get(uri);
      });
  }

  onClick(id: string) {
    this.onPatternClicked.emit(id);
  }

}
