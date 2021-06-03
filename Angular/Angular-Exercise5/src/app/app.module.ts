import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { FontSizeUpdatorDirective } from './directives/font-size-updator.directive';
import { IsAuthorizedDirective } from './directives/is-authorized.directive';

@NgModule({
  declarations: [
    AppComponent,
    FontSizeUpdatorDirective,
    IsAuthorizedDirective
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
