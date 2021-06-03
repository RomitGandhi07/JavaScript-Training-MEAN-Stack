import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { stringReversePipe } from './pipes/string-reverse.pipe';
import { formatDatePipe } from './pipes/formate-date.pipe';
import {nameInitialsPipe} from './pipes/name-initials.pipe'


@NgModule({
  declarations: [
    AppComponent,
    stringReversePipe,
    formatDatePipe,
    nameInitialsPipe
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
