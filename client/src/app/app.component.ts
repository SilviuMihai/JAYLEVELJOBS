import { HttpClient } from '@angular/common/http';
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

  constructor(private accountService: AccountService, private sharedDataService: SharingDataServiceService){}
  
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit() {
    this.setCurrentUser();
    this.subscription = this.sharedDataService.currentMessage.subscribe(response => this.isCollapsed = response);
  }

  setCurrentUser(){
    //getting the user from the localStorage from the browser and convert it to a JSON object
    const user: User = JSON.parse(localStorage.getItem('userjayleveljobs'));
    this.accountService.setCurrentUser(user); //to set the user to the buffer
  }

 
}
