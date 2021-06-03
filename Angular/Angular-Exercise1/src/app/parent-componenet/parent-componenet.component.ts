import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-parent-componenet',
  templateUrl: './parent-componenet.component.html',
  styleUrls: ['./parent-componenet.component.css']
})
export class ParentComponenetComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
  }
  parentCounter:number=0;

  // Update the parent counter
  updateParentCounter(){
    ++this.parentCounter;
  }
}
