import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-number-input',
  templateUrl: './number-input.component.html',
  styleUrls: ['./number-input.component.css']
})
export class NumberInputComponent implements OnInit {
  @Input() componentId:string;
  constructor() { }

  ngOnInit(): void {
  }

}
