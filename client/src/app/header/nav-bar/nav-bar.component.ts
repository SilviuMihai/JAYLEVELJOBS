import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/_models/account/user';
import { AccountService } from 'src/app/_services/account_services/account.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(private accountService: AccountService, private router: Router) { }

  loggedIn = false;
  userEmail = '';

  ngOnInit(): void { 
    this.getCurrentUser();   
  }

  getCurrentUser()
  {
    this.accountService.currentUser$.subscribe(user =>{
    if(user)
    {
      this.userEmail = user.email;
      this.loggedIn= true;
    }
    else
    {
      this.loggedIn = false;
    }
    });
  }

  logout()
  {
    this.accountService.logout();
    this.loggedIn= false;
    this.router.navigateByUrl('/');
  }

}
