import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  notValidCredentials:boolean;
  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  // This function is responsible for login
  login(formData){
    const {email,password}=formData;
    // If email is test@gmail.com & password is test then redirect to home page
    if(email==="test@gmail.com" && password==="test"){
      this.notValidCredentials=false;
      this.router.navigate(['home']);
      return;
    }
    
    // Else show alert
    this.notValidCredentials=true;
  }
}
