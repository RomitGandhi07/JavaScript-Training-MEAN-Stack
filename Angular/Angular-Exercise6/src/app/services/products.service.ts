import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor() { }

  // This function is responsible for getting all the products
  getProducts(){
    const products:any=localStorage.getItem("products");
    if(!products){return null;}
    return JSON.parse(products);
  }

  getSpecificProduct(id){
    let products:any=localStorage.getItem("products");
    if(!products){return null;}

    products=JSON.parse(products);
    const product=products.find(product=>product.id===id);
    if(!product){return null;}
    return product;
  }

  // This function is responsible for adding the product
  addProduct(productName){
    // Check if products array is there or not
    let products:any=localStorage.getItem("products");
    if(!products){
      // If not then create
      products=[];
    }
    else{
      // If it is there then parse it
      products=JSON.parse(products);
    }

    // Generate id and Add new product to products
    const id=products.length+1;
    products.push({id, name: productName});

    // Set that to localstorage
    localStorage.setItem("products",JSON.stringify(products));
  }

  // This function is responsible for edit the product
  editProduct(productId, productName){
    // Get products
    let products:any=JSON.parse(localStorage.getItem("products"));

    // Update product name
    const index=products.findIndex(product=>product.id===productId);
    products[index].name=productName;

    // Set that to localstorage
    localStorage.setItem("products",JSON.stringify(products));
  }
}

