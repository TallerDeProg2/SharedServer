import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  rules: any;

  constructor(
    private authService:AuthService,
    private router:Router,
    private flashMessage:FlashMessagesService
  ) { }

  ngOnInit() {
    this.authService.getRules().subscribe(
      (data) => {
        if (data.success){
          this.rules = data.rules;
          console.log("ITEMS", this.rules);
        } else {
          this.flashMessage.show("Something went wrong", {
            cssClass: 'alert-danger', timeout: 3000});
          console.log("uya");
          return false;
        }
      },
    (error) => {
      this.flashMessage.show("Something went wrong", {
        cssClass: 'alert-danger', timeout: 3000});
      console.log("uya-2");
      return false;
    });
  }

  onRuleClick(ruleId){
    this.router.navigate(['view-rule/', ruleId]);
  }

}
