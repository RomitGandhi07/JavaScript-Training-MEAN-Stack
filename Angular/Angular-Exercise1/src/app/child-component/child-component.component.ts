import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-child-component',
  templateUrl: './child-component.component.html',
  styleUrls: ['./child-component.component.css']
})
export class ChildComponentComponent implements OnInit {
  constructor() { 
    
  }

  ngOnInit(): void {
  }

  childCounter:number=0;
  
  // To initialize eventemitter and emit when button is clicked
  @Output() parentIncrement=new EventEmitter();

  updateParentCounter(){
    this.parentIncrement.emit("Parent Click");
  }

  // Update Child Counter
  updateChildCounter(){
    ++this.childCounter;
  }

}
