import { ChangeDetectorRef, Component, NgZone, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { PatternRenderingComponentInterface } from '../../../../../core/model/pattern-rendering-component.interface';
import { ActivatedRoute, Router } from '@angular/router';
import CloudComputingPattern from '../../model/cloud-computing-pattern';
import { TdTextEditorComponent } from '@covalent/text-editor';
import { MatDialog } from '@angular/material';
import { DialogData, MdEditorComponent } from '../../../../../core/component/md-editor/md-editor.component';
import { PatternService } from '../../../../../core/service/pattern.service';
import CloudComputingPatternHelper from '../../util/CloudComputingPatternHelper';
import { UriConverter } from '../../../../../core/util/uri-converter';

@Component({
    selector: 'pp-cloud-computing-pattern',
    templateUrl: './cloud-computing-pattern.component.html',
    styleUrls: ['./cloud-computing-pattern.component.scss']
})
export class CloudComputingPatternComponent implements PatternRenderingComponentInterface, OnInit, OnChanges {

    @ViewChild('mdEditor') private _textEditor: TdTextEditorComponent;

    pId: string;

    pattern: CloudComputingPattern;
    mdEditorOptions = {};
    editMode = {
        intent: {showActionButtons: false},
        drivingQuestion: {showActionButtons: false},
        context: {showActionButtons: false},
        solution: {showActionButtons: false},
        solutionSketches: {showActionButtons: false},
        result: {showActionButtons: false},
    };

    constructor(private cdr: ChangeDetectorRef,
                private router: Router,
                private activatedRoute: ActivatedRoute,
                private zone: NgZone,
                private patternService: PatternService,
                private dialog: MatDialog) {
    }

    async ngOnInit() {
        const encodedUri = UriConverter.decodeUri(this.activatedRoute.snapshot.paramMap.get('pEncodedUri'));
        this.pattern = await this.patternService.getPatternByEncodedUri(encodedUri)
            .then(result => CloudComputingPatternHelper.convertToCloudComputingPattern(result));
    }

    ngOnChanges(changes: SimpleChanges) {
        console.log('> Changes');
        if (changes['pEncodedUri']
            && JSON.stringify(changes['pEncodedUri'].currentValue) !== JSON.stringify(changes['pEncodedUri'].previousValue)) {
            // reload everything
            // this.loader.loadContentFromStore()
            //     .then(patternMap => {
            //         this.pattern = patternMap.get(UriConverter.doubleDecodeUri(this.pEncodedUri));
            //         this.cdr.detectChanges();
            //     });
        }
    }

    openEditor(field: string): void {
        const dialogRef = this.dialog.open(MdEditorComponent,
            {data: {field: field, label: this.pattern[field].label, content: this.pattern[field].value}});
        this.editMode[field].edit = true;
        dialogRef.afterClosed().subscribe(async (result: DialogData) => {
            this.pattern[field].value = result.content;
            // await this.writer.writePatternToStore(this.pattern).catch(err => console.error(err));
        });
    }

    navigateBack(): void {
        this.zone.run(() => {
            this.router.navigate(['..'], {relativeTo: this.activatedRoute});
        });
    }
}
