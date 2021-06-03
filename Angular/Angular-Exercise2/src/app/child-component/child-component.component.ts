import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-child-component',
  templateUrl: './child-component.component.html',
  styleUrls: ['./child-component.component.css'],
  encapsulation: ViewEncapsulation.None

})
export class ChildComponentComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
