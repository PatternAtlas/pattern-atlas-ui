import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'pp-creative-license-footer',
  templateUrl: './creative-license-footer.component.html',
  styleUrls: ['./creative-license-footer.component.css']
})
export class CreativeLicenseFooterComponent implements OnInit {

  @Input() patternLanguage;

  constructor() {
  }

  ngOnInit() {
  }

}
