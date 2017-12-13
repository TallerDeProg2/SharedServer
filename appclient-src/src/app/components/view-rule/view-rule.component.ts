import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-view-rule',
  templateUrl: './view-rule.component.html',
  styleUrls: ['./view-rule.component.css']
})
export class ViewRuleComponent implements OnInit {
  ruleId: number;
  ruleCommits: any;

  constructor(
    private authService:AuthService,
    private router:Router,
    private flashMessage:FlashMessagesService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
        this.ruleId = +params['id'];
        this.authService.getRuleCommits(this.ruleId).subscribe(
          (data) => {
            if (data.success){
              this.ruleCommits = data.commits;
              console.log("Tengo la rule");
              console.log(this.ruleCommits);
            } else {
              this.flashMessage.show("Something went wrong", {
                cssClass: 'alert-danger', timeout: 3000});
              return false;
            }
          },
        (error) => {
          this.flashMessage.show("Something went wrong", {
            cssClass: 'alert-danger', timeout: 3000});
          return false;
        });
    });
  }

}
