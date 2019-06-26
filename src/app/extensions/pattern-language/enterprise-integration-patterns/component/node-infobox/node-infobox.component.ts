import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';
import { NodeInfo } from '../../model';
import { EnterpriseIntegrationPatternLoaderService } from '../../loader/enterprise-integration-pattern-loader.service';
import { EnterpriseIntegrationPatternIncomingLinkLoaderService } from '../../loader/enterprise-integration-pattern-incoming-link-loader.service';
import { EnterpriseIntegrationPatternOutgoingLinkLoaderService } from '../../loader/enterprise-integration-pattern-outgoing-link-loader.service';
import Info from '../../model/info';
import { IriConverter } from 'src/app/core/util/iri-converter';

@Component({
  selector: 'pp-node-infobox',
  templateUrl: './node-infobox.component.html',
  styleUrls: ['./node-infobox.component.scss']
})
export class NodeInfoboxComponent implements OnInit, OnChanges {

  // the id of the clicked pattern to load the data from the store via loader
  @Input() id: string;

  // @Input() info: NodeInfo;
  info: Info;

  @Output() clickEvent = new EventEmitter<Node>();
  @Output() mouseEnterEvent = new EventEmitter<Node>();
  @Output() mouseLeaveEvent = new EventEmitter<Node>();

  constructor(private patternLoader: EnterpriseIntegrationPatternLoaderService,
    private outgoingLoader: EnterpriseIntegrationPatternOutgoingLinkLoaderService,
    private incomingLoader: EnterpriseIntegrationPatternIncomingLinkLoaderService) { }

  ngOnInit() {
    this.loadContent();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['id']) {
      let chng = changes['id'];
      let cur  = JSON.stringify(chng.currentValue);
      let prev = JSON.stringify(chng.previousValue);

      // new id, load new data
      if (cur !== prev) {
        this.loadContent();
      }
    }
  }

  private loadContent() {
    let uri = IriConverter.convertIdToIri(this.id);
    Promise.all([this.patternLoader.loadContentFromStore(uri),
      this.outgoingLoader.loadContentFromStore(uri),
      this.incomingLoader.loadContentFromStore(uri)]
    ).then(values => {
      let pattern = values[0].get(uri);
      let outgoingMap = values[1];
      let incomingMap = values[2];
      
      let outgoing = [];
      outgoingMap.forEach(value => outgoing.push(value));

      let incoming = [];
      incomingMap.forEach(value => incoming.push(value));

      this.info = {
        name: pattern.name,
        group: pattern.group,
        description: pattern.description,
        outgoing: outgoing,
        incoming: incoming
      };
    });
  }

  onClick(event: any, node: Node) {
    event.stopPropagation();

    this.clickEvent.emit(node);
  }

  onMouseEnter(event: any, node: Node) {
    event.stopPropagation();

    this.mouseEnterEvent.emit(node);
  }

  onMouseLeave(event: any, node: Node) {
    event.stopPropagation();
    
    this.mouseLeaveEvent.emit(node);
  }
}
