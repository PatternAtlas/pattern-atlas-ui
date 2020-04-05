import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PatternEvolution, PatternEvolutionService } from '../../pattern-evolution.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'pattern-evolution-detail',
  templateUrl: './pattern-evolution-detail.component.html',
  styleUrls: ['./pattern-evolution-detail.component.scss']
})
export class PatternEvolutionDetailComponent implements OnInit {

  @Input() patternEvolution: PatternEvolution;
  @Output() changed = new EventEmitter<boolean>();

  public disabled = true;

  // JavaScript passes Ojbects via reference
  private name: string;
  private description: string;

  constructor(
    private patternEvolutionService: PatternEvolutionService,
  ) {
  }

  ngOnInit(): void {
  }

  edit() {
    console.log('Edit', this.patternEvolution)
    this.name = this.patternEvolution.name;
    this.description = this.patternEvolution.description;
    this.disabled = !this.disabled;
  }

  cancel() {
    this.disabled = true;
    this.patternEvolution.name = this.name;
    this.patternEvolution.description = this.description;
  }

  exit() {
    console.log('Exit', this.patternEvolution)
    this.patternEvolution = null;
  }

  update() {
    this.patternEvolutionService.updatePatternEvolution(this.patternEvolution).subscribe(result => {
      this.changed.emit();
    })
  }

  delete() {
    console.log('Delete', this.patternEvolution)
    this.patternEvolutionService.deletePatternEvolution(this.patternEvolution).subscribe(result => {
      this.changed.emit();
    })
  }

}
