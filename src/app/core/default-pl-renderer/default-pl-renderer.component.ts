import {ChangeDetectorRef, Component, ElementRef, NgZone, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UriConverter} from '../util/uri-converter';
import {MatDialog} from '@angular/material';
import Pattern from '../model/pattern.model';
import {PatternLanguageService} from '../service/pattern-language.service';
import PatternLanguage from '../model/hal/pattern-language.model';
import {D3Service} from '../../graph/service/d3.service';

@Component({
    selector: 'pp-default-pl-renderer',
    templateUrl: './default-pl-renderer.component.html',
    styleUrls: ['./default-pl-renderer.component.scss']
})
export class DefaultPlRendererComponent implements OnInit {

    patterns: Pattern[] = [];
    patternLanguage: PatternLanguage;
    isLoading = true;
    patternLanguageURI: string;
  @ViewChild('graphWrapper') graph: ElementRef;
  @ViewChild('cardsView') cardsView: ElementRef;
  private nodes: any[];
  graphVisible: boolean;


  constructor(private activatedRoute: ActivatedRoute,
              private cdr: ChangeDetectorRef,
              private dialog: MatDialog,
              private patternLanguageService: PatternLanguageService,
              private d3Service: D3Service) {
    }

    ngOnInit() {
        this.loadData();
    }




  private loadData(): void {
        this.patternLanguageURI = UriConverter.doubleDecodeUri(this.activatedRoute.snapshot.paramMap.get('patternLanguageUri'));
        if (this.patternLanguageURI) {
            this.patternLanguageService.getPatternLanguageByEncodedUri(this.patternLanguageURI).subscribe(
                (patternlanguage) => {
                    this.patternLanguage = patternlanguage;
                    this.isLoading = false;
                  this.initGraph();
                });


        }
    }

  private initGraph(): void {
    if (this.patternLanguage.patterns.length === 0) {
      return;
    }
    const nodes = [];
    for (let i = 0; i < this.patternLanguage.patterns.length; i++) {

      const node = {
        id: i,
        title: this.patternLanguage.patterns[i].name,
        type: 'red',
        x: 0,
        y: 0
      };
      nodes.push(node);


    }
    const networkGraph = this.d3Service.getNetworkGraph(nodes, [], {width: 1450, height: 600});
    networkGraph.ticker.subscribe((d: any) => {
      this.nodes = networkGraph.nodes;
      this.cdr.markForCheck();
    });

  }

  detectChanges() {
    this.cdr.detectChanges();
  }


  onToggle(value: boolean) {
    this.graphVisible = value;
    console.log('toggle: ' + this.graphVisible);
    // this.cardsView.nativeElement.style.display = this.graphVisible ? 'none' : 'flex';
    this.cdr.detectChanges();
  }
}
