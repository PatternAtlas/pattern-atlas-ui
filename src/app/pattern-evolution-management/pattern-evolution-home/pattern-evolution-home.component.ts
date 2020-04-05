import { Component, OnInit, Inject } from '@angular/core';
import { PatternEvolutionService, PatternEvolution } from '../pattern-evolution.service';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from 'src/app/core/component/create-pattern-relation/create-pattern-relation.component';
import { PatternEvolutionCreateDialogComponent } from '../pattern-evolution-create-dialog/pattern-evolution-create-dialog.component';

@Component({
  selector: 'pp-pattern-evolution-home',
  templateUrl: './pattern-evolution-home.component.html',
  styleUrls: ['./pattern-evolution-home.component.scss']
})
export class PatternEvolutionHomeComponent implements OnInit {

  data: PatternEvolution[];
  patterEvolutionDetail: PatternEvolution;

  constructor(
    private patternEvolutinService: PatternEvolutionService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.getAll()
  }

  toggleDetail(patternEvolution: PatternEvolution) {
    this.patterEvolutionDetail = patternEvolution;
  }

  getAll() {
    this.patternEvolutinService.getAllPatternEvolutions().subscribe(result => {
      this.data = result;
    })
  }

  new(): void {
    console.log('New Pattern Evolution');
    const dialogRef = this.dialog.open(PatternEvolutionCreateDialogComponent, {
      width: '500px',
      data: { name: '', description: '' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        this.patternEvolutinService.createPatternEvolution(result).subscribe(result => {
          console.log('Created Pattern Evolution: ', result);
         this.getAll();
        })
      }
    });
  }

  change() {
    console.log(event);
    this.getAll();
  }

}
