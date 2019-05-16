import { Component, OnInit } from '@angular/core';
import { IriConverter } from '../util/iri-converter';
import { ActivatedRoute } from '@angular/router';
import { DefaultPatternLoaderService } from '../service/loader/default-pattern-loader.service';

@Component({
  selector: 'pp-default-pattern-renderer',
  templateUrl: './default-pattern-renderer.component.html',
  styleUrls: ['./default-pattern-renderer.component.scss']
})
export class DefaultPatternRendererComponent implements OnInit {

  constructor(private loader: DefaultPatternLoaderService, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.loader.supportedIRI = IriConverter.convertIdToIri(this.activatedRoute.snapshot.paramMap.get('pid'));
    const data = this.loader.selectContentFromStore().then((result) => {
      console.log(result);
    });
  }

}
