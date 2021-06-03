import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-total-cart-items',
  templateUrl: './total-cart-items.component.html',
  styleUrls: ['./total-cart-items.component.css']
})
export class TotalCartItemsComponent implements OnInit {
  @Input() totalItems:number
  constructor() { }

  ngOnInit(): void {
  }

}
