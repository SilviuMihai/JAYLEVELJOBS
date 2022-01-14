import { Component, DoCheck, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/_services/account_services/account.service';
import { SharingDataServiceService } from 'src/app/_services/shared/sharing-data-service.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  //Variable used to see if the user is logged in or not
  loggedIn = false;

  //Variable used to retain the email of the current user
  userEmail = '';

  //Variable used to show the side bar or hide it
  isCollapsed = false;

  //Variable used to get the width by resising the page
  getScreenWidthOnResize: any;

  //Variable used to get the width by refreshing the page
  getScreenWidthOnRefresh: any;

  //Variable used to show or hide the button for the "Collapse sidebar"
  showIconCollapse = true;

  constructor(private accountService: AccountService, private router: Router,  
    private sharedDataService: SharingDataServiceService) { }
  
  

  ngOnInit(): void {
    //Used for resising the page    
    this.getScreenWidthOnResize = window.innerWidth;

    //Take the width of the screen by using the interface Screen, which has the property width
    this.getScreenWidthOnRefresh = window.innerWidth;
    this.windowRefresh();

    this.getCurrentUser();   
  }

  //Logic used in case of refreshing the page and is collapsing the sidebar 
  windowRefresh() {
    if(this.getScreenWidthOnRefresh <= 650) {
      this.showIconCollapse = false;
    }
  }

  /* Decorator that declares a DOM event to listen for, and provides a handler method to 
   * run when that event occurs. -> https://angular.io/api/core/HostListener
   * Collapse the side bar, when the screen witdh is smaller than 600 
   */
  @HostListener('window:resize', ['$event'])  onWindowResize() {
    this.getScreenWidthOnResize = window.innerWidth;
    if(this.getScreenWidthOnResize <= 650) {
      this.isCollapsed = true;
      this.showIconCollapse = false;
      this.sharedDataService.changeMessage(this.isCollapsed);
    } else {
      this.isCollapsed = false;
      this.showIconCollapse = true;
      this.sharedDataService.changeMessage(this.isCollapsed);
    }
  }

  //Collapse the sidebar
  sendCollapse() {
    if(this.isCollapsed == false) {
      this.isCollapsed = true;
    }
    else {
      this.isCollapsed = false;
    }

    this.sharedDataService.changeMessage(this.isCollapsed);
  }

  //To get the current user logged in
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

  //Log out of the application
  logout()
  {
    this.accountService.logout();
    this.loggedIn= false;
    //this.router.navigateByUrl('/');
  }
}
