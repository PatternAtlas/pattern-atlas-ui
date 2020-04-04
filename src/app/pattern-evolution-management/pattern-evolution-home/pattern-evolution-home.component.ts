import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'pp-pattern-evolution-home',
  templateUrl: './pattern-evolution-home.component.html',
  styleUrls: ['./pattern-evolution-home.component.scss']
})
export class PatternEvolutionHomeComponent implements OnInit {

  data = [
    {title: 'jdjds', more: 'ajbewgabwgipuabwiugepawegiawbgabiugnawöegu9wgawbegpubwg'},
    {title: 'aweggw', more: 'ajbewgabwgipuabwiugepawegiawbgabiugnawöegu9wgawbegpubwg'},
    {title: 'aweggw', more: 'ajbewgabwgipuabwiugepawegiawbgabiugnawöegu9wgawbegpubwg'}
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
