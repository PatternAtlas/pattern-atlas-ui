import { Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'pp-navigate-back',
  templateUrl: './navigate-back.component.html',
  styleUrls: ['./navigate-back.component.scss']
})
export class NavigateBackComponent implements OnInit {

  constructor(private zone: NgZone, private activatedRoute: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
  }

  navigateBack(): void {
    this.zone.run(() => {
      this.router.navigate(['..'], { relativeTo: this.activatedRoute });
    });
  }

}
