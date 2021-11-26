import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
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
export class CompanyJobsLinksComponent implements OnInit {

   /* -- Initialize Variables or Declare -- */
   setPage = true;
   //loggedIn = false;
   getJobs: CompanyLinks[];
   /* ----------------- */

   /* --- Searching --- */
   searchBar = new FormControl('',[Validators.minLength(3),Validators.maxLength(50),Validators.required]);
   oldSearchedValue = "";
   /* ----------------- */
 
 
   /* --- Pagination --- */
   paginationForAllJobs: Pagination;
   paginationForSearching: Pagination;
   pageParametersForAllJobs = new PageParameters();
   pageParametersForSearchedJobs = new PageParameters();
   pageNumberOldValue = 1;
   subscription: Subscription;
   AllJobsOrSearchedJobs = true;
   /* ----------------- */

  constructor(public accountService: AccountService,private informationService: InformationsService, 
    private toastr: ToastrService, private sharedDataService: SharingDataServiceService) { }

 
  ngOnInit(): void {
        this.getCompaniesLinks();   
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
      //this.sharedDataService.sendValuesPagination(response.pagination);
      this.paginationForAllJobs = response.pagination;
    });
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

  //child component - to parent component event
  //this is the parent component
  receiveValueEventPostJob($event) {
    this.setPage = $event;
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
