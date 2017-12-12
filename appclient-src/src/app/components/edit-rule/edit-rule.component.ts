import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-edit-rule',
  templateUrl: './edit-rule.component.html',
  styleUrls: ['./edit-rule.component.css']
})
export class EditRuleComponent implements OnInit {
  messageNew: String;
  blobNew: String;
  activeNew: String;
  ruleId: number;
  ruleOld: any;

  constructor(
    private authService:AuthService,
    private router:Router,
    private flashMessage:FlashMessagesService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
  }

  onEditRuleSubmit(){
    if(!this.messageNew){
      this.flashMessage.show('The message can not be empty', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    if(!this.blobNew){
      this.flashMessage.show('The blob can not be empty', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    if(!this.activeNew){
      this.flashMessage.show('Select if the rule is active or not', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    this.route.params.subscribe(params => {
        this.ruleId = +params['id'];

        this.authService.getRule(this.ruleId).subscribe(
          (data) => {
            this.ruleOld = data.rule;

            const rule = {
              message : this.messageNew,
              blob : this.blobNew,
              active : this.activeNew == "Yes",
              _ref : this.ruleOld._ref
            };

            this.authService.editRule(this.ruleId, rule).subscribe(
              (data) => {
                this.flashMessage.show("Rule edited! Commit ref: "+data.rule.lastcommit._ref, {
                  cssClass: 'alert-success', timeout: 2000});
                this.router.navigate(['view-rule/', this.ruleId]);
              },
              (error) => {
                this.flashMessage.show("Something went wrong!", {
                  cssClass: 'alert-danger', timeout: 3000});
                this.router.navigate(['view-rule/', this.ruleId]);
              });

          },
          (error) => {
            this.flashMessage.show("Something went wrong!", {
              cssClass: 'alert-danger', timeout: 3000});
            this.router.navigate(['view-rule/', this.ruleId]);
          });

    });
  }

}
