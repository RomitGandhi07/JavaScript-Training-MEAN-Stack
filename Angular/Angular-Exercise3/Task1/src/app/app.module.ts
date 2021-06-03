import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CartItemsComponent } from './cart-items/cart-items.component';
import { CartItemThumbnailComponent } from './cart-item-thumbnail/cart-item-thumbnail.component';
import { TotalCartItemsComponent } from './total-cart-items/total-cart-items.component';

@NgModule({
  declarations: [
    AppComponent,
    CartItemsComponent,
    CartItemThumbnailComponent,
    TotalCartItemsComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
