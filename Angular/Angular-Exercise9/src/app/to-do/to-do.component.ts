import { Component, OnInit } from '@angular/core';
import { ItemsService } from '../services/items.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { IToDoItem } from '../shared/toDoItem';

@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.css']
})
export class ToDoComponent implements OnInit {
  items:IToDoItem[];
  curEditItem:any;

  constructor(private itemsService:ItemsService,
              private modalService: NgbModal) { }

  ngOnInit():void{
    //Get all the items
    this.itemsService.getItems()
      .subscribe(data=> this.items=data);
  }

  // This function is responsible for opening the Add modal
  openAddModal(add) {
    this.modalService.open(add, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      // Call Add item
      this.addItem(result);
    }, (reason) => {
    });
  }

  // This function is responsible for opening the Edit modal
  openEditModal(edit,item) {
    this.curEditItem=item;
    this.modalService.open(edit, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      // Call EditItem
      this.editItem(result);
    }, (reason) => {
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  // This function is responsible for adding the item in TO-DO List
  addItem(data){
    this.itemsService.addItem(data)
      .subscribe(data=> this.items.push(data));
  }

  // This function is responsible for deleting the item in TO-DO List
  deleteItem(id){
    this.itemsService.deleteItem(id)
      .subscribe(data=> {
        // Find index and remove from the array
        let index=this.items.findIndex(item => item.id==id);
        this.items.splice(index,1);
      });
  }

  // This function is responsible for updating the item in To-DO List
  editItem(data){
    this.itemsService.addItem(data)
      .subscribe(data=> {
        // Set id because in the response we got id 201
        data.id=this.curEditItem.id;

        // Find index and update it in the array
        let index=this.items.findIndex(item => item.id == data.id);
        this.items[index]=data;

        // Set cur Edit Item to empty string
        this.curEditItem='';
      });
  }

}
