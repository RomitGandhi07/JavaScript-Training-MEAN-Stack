import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-textarea-input',
  templateUrl: './textarea-input.component.html',
  styleUrls: ['./textarea-input.component.css']
})
export class TextareaInputComponent implements OnInit {
  @Input() componentId:string;
  constructor() { }

  ngOnInit(): void {
  }

}
