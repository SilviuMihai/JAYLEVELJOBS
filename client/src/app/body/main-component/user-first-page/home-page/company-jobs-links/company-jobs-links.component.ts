import { AfterViewInit, Component,  DoCheck,  EventEmitter,  OnDestroy,  OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
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
  styleUrls: ['./company-jobs-links.component.css']
})
export class CompanyJobsLinksComponent implements OnInit, DoCheck, OnDestroy {

   /* -- Initialize Variables or Declare -- */
   setPageForSearchBar = true;
   setPage = true;
   //loggedIn = false;
   getJobs: CompanyLinks[];
   sharedValues = new SharedValuesCompanyJobsLinks();
 
 
   //Pagination
   pagination = new Pagination();
   pageParameters = new PageParameters();
   pageNumberOldValue = 1;
   subscription: Subscription;
 
   /* ----------------- */

  constructor(public accountService: AccountService,private informationService: InformationsService, 
    private toastr: ToastrService, private sharedDataService: SharingDataServiceService) {}

 
  ngOnInit(): void {
      //this.getCurrentUser();
        this.subscription = this.sharedDataService.receiveValuesPageParameters().subscribe(response => this.pageParameters = response);
        this.getCompaniesLinks();   
  }
  ngDoCheck(): void {
    if(this.setPage && this.setPageForSearchBar)
    {
      if(this.pageNumberOldValue !== this.pageParameters.pageNumber)
      {
        this.getCompaniesLinks();
      }
      this.pageNumberOldValue = this.pageParameters.pageNumber;
    }
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


  /* -- Functions --  */
  getCompaniesLinks() {
    this.informationService.getCompaniesLink(this.pageParameters).subscribe(response =>{ 
      this.getJobs = response.result;
      this.sharedDataService.sendValuesPagination(response.pagination);
    });
    this.setPageForSearchBar = true;
    this.getJobsPage();
  }

  reportCompanyJobLink(id:number){
    this.informationService.reportCompanyJobLink(id).subscribe(()=>
    //refreshes the list of companies without the reported link
    //doesn't make another request to have all the companies, just a refresh of the list
    {
      this.getJobs = this.getJobs.filter(x=> x.idCompanyJobsLinks !== id)
      this.toastr.success("Link was Reported !");
    }
    );
  }

  linkNotAvailable(id:number){
    this.informationService.linkNotAvailable(id).subscribe(()=>
    //refreshes the list of companies without the reported link
    //doesn't make another request to have all the companies, just a refresh of the list
    {
      this.getJobs = this.getJobs.filter(x=> x.idCompanyJobsLinks !== id)
      this.toastr.success("Link was Reported !");
    }
    );
  }

  getJobsPage(){
    this.setPage = true;
  }
  postJobsPage(){
    this.setPage = false;
  }

  //child component - to parent component event
  //this is the parent component
  receiveValueEventPostJob($event) {
    this.setPage = $event;
  }

  //child component - to parent component event
  //this is the parent component
  receiveValueEventSearchBar($event) {
    this.sharedValues = $event;
    this.setPageForSearchBar = this.sharedValues.setPageForSearchBar;
    this.getJobs = this.sharedValues.getjobs;
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
