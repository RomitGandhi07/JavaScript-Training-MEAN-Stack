import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  item:string;
  items:any=[];
  authorizationTokens:any=[];

  constructor(){
    this.items=['View_Products','View_Categories','View_Users'];
  }

  // This function is responsible for adding the item in the items array
  addItem(){
    // Ensure that name doesn't have only whitespace
    let demo=this.item;
    demo=demo.trim();
    if(!demo){
      alert("Please enter item name");
      return;
    }

    // If already same item is there then display error
    if(this.items.includes(this.item)){
      alert("Item is already there...");
      return;
    }
    
    // Otherwise add item in the array and make input field blank
    this.items.push(this.item);
    this.item='';
  }

  // This function is responsible for add/remove authorization token from array
  changeAuthorizationTokens(index){
    // get token from items array and find it in authorization tokens array
    const location=this.authorizationTokens.indexOf(this.items[index]);

    // If token is there then remove it otherwise add it
    (location!==-1)
      ?this.authorizationTokens.splice(location,1)
      :this.authorizationTokens.push(this.items[index]);
  }
}
