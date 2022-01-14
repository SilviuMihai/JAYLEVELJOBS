import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from './_models/account/user';
import { AccountService } from './_services/account_services/account.service';
import { SharingDataServiceService } from './_services/shared/sharing-data-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Client APP';
  users:any;
  isCollapsed = false;
  subscription: Subscription;
  getScreenWidthOnRefresh: any;

  constructor(private accountService: AccountService, private sharedDataService: SharingDataServiceService){}
  
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit() {
    this.setCurrentUser();
    this.subscription = this.sharedDataService.currentMessage.subscribe(response => this.isCollapsed = response);
    //Take the width of the screen by using the interface Screen, which has the property width
    this.getScreenWidthOnRefresh = window.innerWidth;
    this.windowRefresh();
  }

  //Logic used in case of refreshing the page and is collapsing the sidebar 
  windowRefresh() {
    if(this.getScreenWidthOnRefresh <= 650) {
      this.isCollapsed = true;
    }
  }

  setCurrentUser(){
    //getting the user from the localStorage from the browser and convert it to a JSON object
    const user: User = JSON.parse(localStorage.getItem('userjayleveljobs'));
    this.accountService.setCurrentUser(user); //to set the user to the buffer
  }

 
}
