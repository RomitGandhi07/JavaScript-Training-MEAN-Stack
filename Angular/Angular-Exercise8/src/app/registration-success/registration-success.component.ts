import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
@Component({
  selector: 'app-registration-success',
  templateUrl: './registration-success.component.html',
  styleUrls: ['./registration-success.component.css']
})
export class RegistrationSuccessComponent implements OnInit {
  userDetails:any;
  constructor(private router:Router) { }

  ngOnInit(): void {
    // Get user details
    this.userDetails=JSON.parse(localStorage.getItem("userDetails"));

    // If there are no details then navigate to /register
    if(!this.userDetails){
      this.router.navigate(['register']);
      return;
    }
  }

}
