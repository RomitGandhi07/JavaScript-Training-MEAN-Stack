import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-parent-component',
  templateUrl: './parent-component.component.html',
  styleUrls: ['./parent-component.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ParentComponentComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
