import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-cart-item-thumbnail',
  templateUrl: './cart-item-thumbnail.component.html',
  styleUrls: ['./cart-item-thumbnail.component.css']
})
export class CartItemThumbnailComponent implements OnInit {
  constructor() { }
  @Input() item: any

  @Output() decreaseQuantity = new EventEmitter();
  @Output() increaseQuantity = new EventEmitter();
  @Output() deleteItem = new EventEmitter();

  ngOnInit(): void {
  }

  decreaseItemQuantity() {
    this.decreaseQuantity.emit(this.item.id);
  }

  increaseItemQuantity() {
    this.increaseQuantity.emit(this.item.id);
  }

  deleteItemFromCart() {
    this.deleteItem.emit(this.item.id);
  }

}
