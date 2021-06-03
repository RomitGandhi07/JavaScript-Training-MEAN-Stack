import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent implements OnInit {
  productId:number;
  product:any;
  constructor(private route: ActivatedRoute,
              private router:Router,
              private productService: ProductsService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params:ParamMap)=>{
      this.productId=parseInt(params.get('id'));
    });
    
    this.product=this.productService.getSpecificProduct(this.productId);
  }

}
