import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IriConverter } from 'src/app/core/util/iri-converter';
import LinkInfo from '../../model/link-info';
import LinkData from '../../model/link-data';

@Component({
  selector: 'pp-link-infobox',
  templateUrl: './link-infobox.component.html',
  styleUrls: ['./link-infobox.component.scss']
})
export class LinkInfoboxComponent implements OnInit {

  // the link data to be displayed
  @Input() linkData: LinkData;
  // the id of the currently inspected pattern. Can be null
  @Input() currentPatternId?: string;

  // gets called if a pattern within the infobox has been clicked, parameter is the corresponding id of the pattern
  @Output() onPatternClicked = new EventEmitter<string>();

  // given data will be transformed into a different model
  linkInfo: LinkInfo;

  constructor() { }

  ngOnInit() {
    this.convertData();
  }

  convertData() {
    const data = this.linkData;

    if (this.currentPatternId) {
      if (data.sourcePattern.id === this.currentPatternId) {
        this.linkInfo = {
          currPattern: {
            id: data.sourcePattern.id,
            name: data.sourcePattern.name
          },
          linkedPattern: {
            id: data.targetPattern.id,
            name: data.targetPattern.name
          },
          descriptions: data.descriptions,
          direction: 'outgoing'
        };
      } else if (data.targetPattern.id === this.currentPatternId) {
        this.linkInfo = {
          currPattern: {
            id: data.targetPattern.id,
            name: data.targetPattern.name
          },
          linkedPattern: {
            id: data.sourcePattern.id,
            name: data.sourcePattern.name
          },
          descriptions: data.descriptions,
          direction: 'incoming'
        };
      }
    } else {
      // default case is, source pattern is the current pattern
      this.linkInfo = {
        currPattern: {
          id: data.sourcePattern.id,
          name: data.sourcePattern.name
        },
        linkedPattern: {
          id: data.targetPattern.id,
          name: data.targetPattern.name
        },
        descriptions: data.descriptions,
        direction: 'outgoing'
      };
    }
  }

  onClick(event: any, id: string) {
    event.stopPropagation();

    this.onPatternClicked.emit(id);
  }

}
