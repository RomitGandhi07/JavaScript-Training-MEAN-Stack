import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router:Router) { }

  // This function is responsible for cheking that user is loggedIn or not
  loggedIn(): boolean {
    return (localStorage.getItem("loggedIn")) ? true : false;
  }
  
  // This function is responsible for creating the session(store in localstorage) & rnavigate to /home
  createSession(){
    localStorage.setItem("loggedIn",String(true));
    this.router.navigate(['/home']);
  }
}
