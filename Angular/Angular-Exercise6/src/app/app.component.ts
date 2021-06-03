import { Component} from '@angular/core';
import { AuthService } from './services/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private authService:AuthService){}

  // This function is responsible for checking that user is loggedIn or not
  checkLogin(){
    return this.authService.loggedIn();
  }
}
