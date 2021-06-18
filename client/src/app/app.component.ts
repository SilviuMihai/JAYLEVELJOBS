import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from './_models/account/user';
import { AccountService } from './_services/account_services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Client APP';
  users:any;

  constructor(private accountService: AccountService){}

  ngOnInit() {
    this.setCurrentUser();
  }

  setCurrentUser(){
    //getting the user from the localStorage from the browser and convert it to a JSON object
    const user: User = JSON.parse(localStorage.getItem('userjayleveljobs'));
    this.accountService.setCurrentUser(user); //to set the user to the buffer
  }

 
}
