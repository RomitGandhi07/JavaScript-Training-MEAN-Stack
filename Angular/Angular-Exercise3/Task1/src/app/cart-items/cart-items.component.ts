import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart-items',
  templateUrl: './cart-items.component.html',
  styleUrls: ['./cart-items.component.css']
})
export class CartItemsComponent implements OnInit {
  items: any;
  totalItems: number;
  constructor() {
  }

  ngOnInit(): void {
    this.items = [];
    this.totalItems = 0;
  }


  // This function is responsible for adding item to the cart
  addItemToCart() {
    // Generate Rnadom Id
    const id = Math.random().toString(36).substring(5);

    // Add item to items array and increment totalItems
    this.items.push({
      id,
      quantity: 1
    });

    ++this.totalItems;
  }

  // This function is responsible for increasing the quantity of item
  increaseItemQuantity(id) {
    // Find and update quantity of given item and update totalItems
    this.items.find(item => item.id === id).quantity++;
    ++this.totalItems;
  }

  // This function is responsible for decreasing the quantity of item
  decreaseItemQuantity(id) {
    // Find Id of the index
    const index = this.items.findIndex(item => item.id === id);

    // If Items quantity is 1 then remove item otherwise decrease quantity
    (this.items[index].quantity === 1)
      ? this.items.splice(index, 1)
      : --this.items[index].quantity;

    // decrease totoalItems
    --this.totalItems;
  }

  // This function in responsible for deleting the item from the cart 
  deleteItemFromCart(id) {
    // Find index of given item in the array and find it's quantity
    const index = this.items.findIndex(item => item.id === id)
    const quantity = this.items[index].quantity;

    // Remove the item and update totalItems
    this.items.splice(index, 1);
    this.totalItems -= quantity;
  }

}
