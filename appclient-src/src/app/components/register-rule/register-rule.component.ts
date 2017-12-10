import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register-rule',
  templateUrl: './register-rule.component.html',
  styleUrls: ['./register-rule.component.css']
})
export class RegisterRuleComponent implements OnInit {
  message: String;
  blob: String;
  active: String;

  constructor(
    private authService:AuthService,
    private router:Router,
    private flashMessage:FlashMessagesService
  ) { }

  ngOnInit(){}

  onRegisterRuleSubmit() {
    const rule = {
      message : this.message,
      blob : this.blob,
      active : this.active == "Yes"
    }

    console.log(rule);
    console.log(this.active);

    if(!this.message){
      this.flashMessage.show('The message can not be empty', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    if(!this.blob){
      this.flashMessage.show('The blob can not be empty', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    if(!this.active){
      this.flashMessage.show('Select if the rule is active or not', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    this.authService.registerRule(rule).subscribe(
      (data) => {
        this.flashMessage.show("Rule created! Id: "+data.rule.id, {
          cssClass: 'alert-success', timeout: 2000});
        this.router.navigate(['dashboard']);
      },
      (error) => {
        this.flashMessage.show("Something went wrong!", {
          cssClass: 'alert-danger', timeout: 3000});
        this.router.navigate(['register-rule']);
      });
  }

}
