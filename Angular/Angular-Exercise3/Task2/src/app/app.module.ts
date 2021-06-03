import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TextInputComponent } from './text-input/text-input.component';
import { NumberInputComponent } from './number-input/number-input.component';
import { TextareaInputComponent } from './textarea-input/textarea-input.component';

@NgModule({
  declarations: [
    AppComponent,
    TextInputComponent,
    NumberInputComponent,
    TextareaInputComponent
  ],
  entryComponents: [TextInputComponent ,NumberInputComponent, TextareaInputComponent],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
