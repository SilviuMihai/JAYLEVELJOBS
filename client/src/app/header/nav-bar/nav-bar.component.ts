import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/_services/account_services/account.service';
import { SharingDataServiceService } from 'src/app/_services/shared/sharing-data-service.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  loggedIn = false;
  userEmail = '';
  isCollapsed = false;
  
  constructor(private accountService: AccountService, private router: Router, private sharedDataService: SharingDataServiceService) { }
  

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
    //this.router.navigateByUrl('/');
  }

  sendCollapse() {
    if(this.isCollapsed == false) {
      this.isCollapsed = true;
    }
    else {
      this.isCollapsed = false;
    }
    this.sharedDataService.changeMessage(this.isCollapsed);
  }

}
