import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  username: String;
  password: String;

  constructor(
    private authService:AuthService,
    private router:Router,
    private flashMessage:FlashMessagesService) { }

  ngOnInit() {
  }

  onLoginSubmit(){
    const user = {
      username: this.username,
      password: this.password
    }

    this.authService.authenticateUser(user).subscribe(
      (data) => {
        if (data.success){
          console.log(data);
          this.authService.storeUserData(data.token.token, user);
          this.flashMessage.show("Login succesful!", {
            cssClass: 'alert-success', timeout: 5000});
          this.router.navigate(['dashboard']);
        } else {
          this.flashMessage.show(data.message, {
            cssClass: 'alert-danger', timeout: 5000});
        }
      },
      (error) => {
        this.flashMessage.show("Username or password invalid", {
          cssClass: 'alert-danger', timeout: 5000});
        this.router.navigate(['login']);
      });

  }

}
