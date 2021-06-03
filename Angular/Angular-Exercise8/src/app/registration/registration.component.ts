import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Router} from '@angular/router';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  registrationForm:FormGroup;
  states:string[];
  countries:string[];

  constructor(private fb:FormBuilder,
              private router:Router) { }

  ngOnInit(): void {
    this.registrationForm=this.fb.group({
      userName: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      firstName: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      lastName: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      gender: ['Male'],
      isStudent: [''],
      city: ['',[Validators.required,Validators.maxLength(300)]],
      streetAddress: ['', [Validators.required,Validators.maxLength(1000)]],
      state: ['', Validators.required],
      country: ['',Validators.required]
    })

    this.states=["State1","State2","State3","State4"];
    this.countries=["Country1","Country2","Country3","Country4"];

    // Remove User Details 
    localStorage.removeItem("userDetails");
  }

  // Getters of User Name, First Name, Last Name, Street Address, City, State, Country
  get userName(){
    return this.registrationForm.get('userName');
  }

  get firstName(){
    return this.registrationForm.get('firstName');
  }

  get lastName(){
    return this.registrationForm.get('lastName');
  }

  get streetAddress(){
    return this.registrationForm.get('streetAddress');
  }

  get city(){
    return this.registrationForm.get('city');
  }

  get state(){
    return this.registrationForm.get('state');
  }

  get country(){
    return this.registrationForm.get('country');
  }

  // This function is responsible for register
  register(){
    // add details to local storage
    localStorage.setItem("userDetails",JSON.stringify(this.registrationForm.value));
    this.router.navigate(['registration-success'])
  }
} 
