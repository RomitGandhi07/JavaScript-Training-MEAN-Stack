import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products:any;
  constructor(private productService:ProductsService,
              private router:Router) { }

  ngOnInit(): void {
    this.products=this.productService.getProducts();
  }
}
