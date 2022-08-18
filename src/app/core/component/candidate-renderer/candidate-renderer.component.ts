import { Component, EventEmitter, Input, NgZone, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Candidate, CandidateManagementStore } from '../../candidate-management';
import { PrivilegeService } from 'src/app/authentication/_services/privilege.service';
import { ToasterService } from 'angular2-toaster';
import { MatDialog } from '@angular/material/dialog';
import { UiFeatures } from '../../directives/pattern-atlas-ui-repository-configuration.service';

@Component({
  selector: 'pp-candidate-renderer',
  templateUrl: './candidate-renderer.component.html',
  styleUrls: ['./candidate-renderer.component.scss']
})
export class CandidateRendererComponent {

    readonly UiFeatures = UiFeatures;
    @Input() candidates: Array<Candidate>;
    @Output() createEntityClicked: EventEmitter<void> = new EventEmitter<void>();
  
    constructor(private zone: NgZone,
                private router: Router,
                private activatedRoute: ActivatedRoute,
                public candidateStore: CandidateManagementStore,
                private toasterService: ToasterService,
                private dialog: MatDialog,
                private p: PrivilegeService) {
    }
  
    detail(candidate: Candidate) {
      this.candidateStore.addCandidate(candidate);
      this.router.navigate(['./candidate/detail', candidate.name]);
    }
    
    edit(candidate: Candidate) {
      this.candidateStore.addCandidate(candidate)
      this.router.navigate(['./candidate/edit', candidate.name]);
    }

}
  
