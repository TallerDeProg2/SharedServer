import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

import { RouterModule } from '@angular/router';
import { RulesComponent } from './rules/rules.component';

const ROUTES = [
  {
   path: '',
   redirectTo: 'rules',
   pathMatch: 'full'
  },
  {
    path: 'rules',
    component: RulesComponent
  }
];


@NgModule({
  declarations: [
    AppComponent,
    RulesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
