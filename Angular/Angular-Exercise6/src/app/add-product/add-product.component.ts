import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  productName:string;
  constructor(private productsService:ProductsService,
              private router:Router) { }

  ngOnInit(): void {
  }

  // This function is responsible for adding the product
  addProduct(){
    // Check that entered product name is valid or not
    const temp=this.productName.trim();
    if(!temp){
      alert("Please Enter Product Name...");
      return;
    }

    // Add the product and navigate to /products
    this.productsService.addProduct(this.productName);
    this.router.navigate(['/products']);
  }
}
