import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  str: string = "sample string";
  curDate: Date = new Date();
  name: string = "Romit           Gandhi";
}
