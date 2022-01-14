import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { AfterViewInit, ChangeDetectionStrategy, Component,  DoCheck,  EventEmitter,  HostListener,  OnDestroy,  OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { PaginationComponent } from 'ngx-bootstrap/pagination';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { SharedValuesCompanyJobsLinks } from 'src/app/shared/Information/SharedCompanyJobsLinks';
import { CompanyLinks } from 'src/app/_models/informations/CompanyLinks';
import { SearchJobs } from 'src/app/_models/informations/SearchJobs';
import { PageParameters } from 'src/app/_models/pagination/PageParameters';
import { Pagination } from 'src/app/_models/pagination/pagination';
import { AccountService } from 'src/app/_services/account_services/account.service';
import { InformationsService } from 'src/app/_services/informations_services/informations.service';
import { SharingDataServiceService } from 'src/app/_services/shared/sharing-data-service.service';

@Component({
  selector: 'app-company-jobs-links',
  templateUrl: './company-jobs-links.component.html',
  styleUrls: ['./company-jobs-links.component.css'],
})
export class CompanyJobsLinksComponent implements OnInit {

   /* -- Initialize Variables or Declare -- */
   setPage = true;
   //loggedIn = false;
   getJobs: CompanyLinks[];
   smallerScreen = false;
   

   /* --- Searching --- */
   searchBar = new FormControl('',[Validators.minLength(3),Validators.maxLength(50),Validators.required]);
   oldSearchedValue = "";
   
 
 
   /* --- Pagination --- */
   paginationForAllJobs: Pagination;
   paginationForSearching: Pagination;
   pageParametersForAllJobs = new PageParameters();
   pageParametersForSearchedJobs = new PageParameters();
   pageNumberOldValue = 1;
   subscription: Subscription;
   AllJobsOrSearchedJobs = true;
   maxSize = 10;

   //Access to the Child component Pagination, to be able to modify the properties, more specific the "maxSize"
   @ViewChild(PaginationComponent) paginationComp!: PaginationComponent;
   

   //Variable used to get the width by resising the page
  getScreenWidthOnResize: any;

  //Variable used to get the width by refreshing the page
  getScreenWidthOnRefresh: any;

  constructor(public accountService: AccountService,private informationService: InformationsService, 
    private toastr: ToastrService, private sharedDataService: SharingDataServiceService) { }

 
  ngOnInit(): void {
        this.getCompaniesLinks();
        //Used for resising the page    
        this.getScreenWidthOnResize = window.innerWidth;

        //Take the width of the screen by using the interface Screen, which has the property width
        this.getScreenWidthOnRefresh = window.innerWidth;
        this.windowRefresh();   
  }
  

/* -- Functions --  */
  getSearchedJobs() {
    this.AllJobsOrSearchedJobs = false;
    let model = new SearchJobs();
    model.searchJob = this.searchBar.value;

    if(model.searchJob != this.oldSearchedValue) {
      this.paginationForSearching = null;
      this.pageParametersForSearchedJobs.pageNumber = 1;
    }
    this.oldSearchedValue = model.searchJob;

    this.informationService.getCompaniesSearchedByUser(model,this.pageParametersForSearchedJobs).subscribe(response=>{
      this.getJobs = response.result;
      this.paginationForSearching = response.pagination;
    });
  }

  getCompaniesLinks() {
    this.AllJobsOrSearchedJobs = true;
    this.paginationForSearching = null;
    this.informationService.getCompaniesLink(this.pageParametersForAllJobs).subscribe(response =>{ 
      this.getJobs = response.result;
      this.paginationForAllJobs = response.pagination;
    });
    this.getJobsPage();
  }

  reportCompanyJobLink(id:number){
    this.informationService.reportCompanyJobLink(id).subscribe(()=>
    /* Refreshes the list of companies without the reported link
     * Doesn't make another request to have all the companies, just a refresh of the list 
     */
    {
      this.getJobs = this.getJobs.filter(x=> x.idCompanyJobsLinks !== id)
      this.toastr.success("Link was Reported !");
    }
    );
  }

  linkNotAvailable(id:number){
    this.informationService.linkNotAvailable(id).subscribe(()=>
    /* Refreshes the list of companies without the reported link
     * Doesn't make another request to have all the companies, just a refresh of the list 
     */
    {
      this.getJobs = this.getJobs.filter(x=> x.idCompanyJobsLinks !== id)
      this.toastr.success("Link was Reported !");
    }
    );
  }

  pageChanged(event: any) {
    if(this.AllJobsOrSearchedJobs) {
      this.pageParametersForAllJobs.pageNumber = event.page;
      this.getCompaniesLinks();
    }
    else {
      this.pageParametersForSearchedJobs.pageNumber = event.page;
      this.getSearchedJobs();
    }
  }

  getJobsPage(){
    this.setPage = true;
  }
  postJobsPage(){
    this.setPage = false;
  }

  /* 
   * Value Received from the post-company-jobs component (child component of company-jobs-links): 
   * - child component - to parent component event
   * - this is the parent component 
   */
  receiveValueEventPostJob($event) {
    this.pageParametersForAllJobs.pageNumber = this.paginationForAllJobs.totalPages+1;//Math.ceil(Number(((this.paginationForAllJobs.totalItems+1)/5).toFixed(1)));
    this.paginationForAllJobs = null;
    this.getCompaniesLinks();
    this.setPage = $event;
  }

    //Logic used in case of refreshing the page and is collapsing the sidebar 
    windowRefresh() {
      if(this.getScreenWidthOnRefresh <= 1050 && this.getScreenWidthOnRefresh >= 400) {
       this.maxSize = 3;
       this.smallerScreen = true;
      }
      else if(window.innerWidth < 400) {
        this.maxSize = 0;
        this.smallerScreen = true;
      }
      else {
        this.maxSize = 10;
        this.smallerScreen = false;
      }
    }
  
    /* Decorator that declares a DOM event to listen for, and provides a handler method to 
     * run when that event occurs. -> https://angular.io/api/core/HostListener
     * Sets the pagination maxSize to be smaller when the width decreases
     */
    @HostListener('window:resize', ['$event'])  onWindowResize() {
      //const newMaxSize = window.innerWidth <= 1050 ? 3 : 10;
      let newMaxSize = 10;
      if(window.innerWidth <= 1050 && window.innerWidth >= 400) {
        newMaxSize = 3;
        this.smallerScreen = true;
      }
      else if (window.innerWidth < 400) {
        newMaxSize = 0;
        this.smallerScreen = true;
      } 
      else {
        newMaxSize = 10;
        this.smallerScreen = false;
      }

      if (this.paginationComp.maxSize !== newMaxSize) {
        this.paginationComp.maxSize = newMaxSize;
        this.paginationComp.selectPage(this.paginationComp.page);
      }
    }

  /* getCurrentUser()
  {
    this.accountService.currentUser$.subscribe(user =>{
    if(user)
    {
      this.loggedIn= true;
    }
    else
    {
      this.loggedIn = false;
    }
    });
  } */
}
