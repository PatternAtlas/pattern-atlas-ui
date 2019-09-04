import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { DefaultPlLoaderService } from '../service/loader/default-pl-loader.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IriConverter } from '../util/iri-converter';
import { PatternOntologyService } from '../service/pattern-ontology.service';
import { PatternInstance } from '../model/PatternInstance.interface';
import { CreateEditPatternLanguageComponent } from '../../pattern-language-management/create-edit-pattern-language/create-edit-pattern-language.component';
import { MatDialog } from '@angular/material';
import { DialogPatternLanguageResult } from '../../pattern-language-management/data/DialogPatternLanguageResult.interface';

@Component({
    selector: 'pp-default-pl-renderer',
    templateUrl: './default-pl-renderer.component.html',
    styleUrls: ['./default-pl-renderer.component.scss']
})
export class DefaultPlRendererComponent implements OnInit {

  patterns: PatternInstance[] = [];
  plIri: string;
  plName: string;
  isLoading = true;

  constructor(private loader: DefaultPlLoaderService,
              private activatedRoute: ActivatedRoute,
              private cdr: ChangeDetectorRef,
              private zone: NgZone,
              private router: Router,
              private pos: PatternOntologyService,
              private dialog: MatDialog) {
    }

    ngOnInit() {
      this.loader.supportedIRI = IriConverter.convertIdToIri(this.activatedRoute.snapshot.paramMap.get('plid'));
      this.plIri = IriConverter.convertIdToIri(this.activatedRoute.snapshot.paramMap.get('plid'));
      this.plName = IriConverter.extractIndividualNameFromIri(this.plIri);

      this.loadData().then(() => {
        this.isLoading = false;
        this.cdr.detectChanges();
      });
    }

  getKeys(map) {
    return Array.from(map.keys());
  }

  navigate(pattern: PatternInstance): void {
    this.zone.run(() => {
      this.router.navigate([IriConverter.convertIriToId(pattern.uri)], {relativeTo: this.activatedRoute});
    });
  }

  goToPatternCreation() {
    this.zone.run(() => {
      this.router.navigate(['create-pattern'], {relativeTo: this.activatedRoute});
    });
  }

  getNameForPattern(pattern: PatternInstance) {
    return IriConverter.extractIndividualNameFromIri(pattern.uri);
  }

  getSectionName(patternSection: string) {
    return IriConverter.getSectionName(patternSection);
  }

  async loadData() {
    await this.pos.loadUrisToStore([{value: this.plIri, token: null}]);
    const importedPatternIris = await this.loader.getOWLImports(this.plIri);
    await this.pos.loadUrisToStore(importedPatternIris.map(i => i.import));
    this.patterns = Array.from((await this.loader.loadContentFromStore()).values());
  }

  addRelationType() {
    const dialogRef = this.dialog.open(CreateEditPatternLanguageComponent, {
      data: {plIri: this.plIri, plName: this.plName}
    });
    (<CreateEditPatternLanguageComponent> dialogRef.componentInstance).saveClicked.subscribe((result: DialogPatternLanguageResult) => {

    });
  }
}
