import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  productId: number;
  productName:string;
  isValidProduct:boolean=true;
  constructor(private route: ActivatedRoute,
              private router: Router,
              private productsService:ProductsService) { }

  ngOnInit(): void {
    // Get calue of id
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.productId = parseInt(params.get('id'));
    });

    // Get product, if product is there then set product name else set isValidProduct to false
    const product=this.productsService.getSpecificProduct(this.productId);
    (product)?this.productName=product.name:this.isValidProduct=false;
  }

  updateProduct(){
    // Check that entered product name is valid or not
    const temp=this.productName.trim();
    if(!temp){
      alert("Please Enter Product Name...");
      return;
    }

    // Update the product and navigate to /products
    this.productsService.editProduct(this.productId,this.productName);
    this.router.navigate(['/products']);
  }

}
