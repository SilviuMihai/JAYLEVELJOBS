import { Component,  OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CompanyLinks } from 'src/app/_models/informations/CompanyLinks';
import { SearchJobs } from 'src/app/_models/informations/SearchJobs';
import { PageParameters } from 'src/app/_models/pagination/PageParameters';
import { Pagination } from 'src/app/_models/pagination/pagination';
import { AccountService } from 'src/app/_services/account_services/account.service';
import { InformationsService } from 'src/app/_services/informations_services/informations.service';

@Component({
  selector: 'app-company-jobs-links',
  templateUrl: './company-jobs-links.component.html',
  styleUrls: ['./company-jobs-links.component.css']
})
export class CompanyJobsLinksComponent implements OnInit {

    
  searchBar = new FormControl('',[Validators.minLength(3),Validators.maxLength(50),Validators.required])


  setPage = true;
  loggedIn = false;
  getJobs: CompanyLinks[];

  //Pagination
  pagination: Pagination;
  pageParameters = new PageParameters();


  constructor(public accountService: AccountService,private informationService: InformationsService, 
    private toastr: ToastrService) 
  {
  }
 

  
  ngOnInit(): void {
      //this.getCurrentUser();
        this.getCompaniesLinks();   
  }



  getCompaniesLinks()
  {
    this.informationService.getCompaniesLink(this.pageParameters).subscribe(response =>{ 
      this.getJobs = response.result;
      this.pagination = response.pagination;
    });
    this.getJobsPage();
  }

  getSearchedJobs(){
    let model = new SearchJobs();
    model.searchJob = this.searchBar.value;
    this.informationService.getCompaniesSearchedByUser(model).subscribe(response=>{
      this.getJobs = response;
    }); 
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
  receiveValueEvent($event){
    this.setPage = $event;
  }

  pageChanged(event: any) {
    //here we are taking the page number that is currently pressed
    this.pageParameters.pageNumber = event.page;
    //and give it to the request that is inside of getCompaniesLinks()
    this.getCompaniesLinks();
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
