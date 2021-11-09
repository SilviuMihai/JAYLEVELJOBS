import { Component, DoCheck, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { SharedValuesCompanyJobsLinks } from 'src/app/shared/Information/SharedCompanyJobsLinks';
import { CompanyLinks } from 'src/app/_models/informations/CompanyLinks';
import { SearchJobs } from 'src/app/_models/informations/SearchJobs';
import { PageParameters } from 'src/app/_models/pagination/PageParameters';
import { Pagination } from 'src/app/_models/pagination/pagination';
import { InformationsService } from 'src/app/_services/informations_services/informations.service';
import { SharingDataServiceService } from 'src/app/_services/shared/sharing-data-service.service';

@Component({
  selector: 'app-search-company-job',
  templateUrl: './search-company-job.component.html',
  styleUrls: ['./search-company-job.component.css']
})
export class SearchCompanyJobComponent implements OnInit, OnDestroy, DoCheck {

  searchBar = new FormControl('',[Validators.minLength(3),Validators.maxLength(50),Validators.required])

  /* Pagination */
  pagination = new Pagination();
  pageParameters = new PageParameters();
  subscription: Subscription;
  pageNumberOldValue = 1;
  /* --- */
  sharedValues = new SharedValuesCompanyJobsLinks();
  getJobs: CompanyLinks[];
  //child component - to parent component event
  //this is the child component
  @Output() itemEvent = new EventEmitter<SharedValuesCompanyJobsLinks>();
  //parent component - to child component event
  //this is the child component
  @Input() setPageForSearchBar = true;

  constructor(private informationService: InformationsService, private sharedDataService: SharingDataServiceService) { }
  
  ngDoCheck(): void {
    if (!this.setPageForSearchBar) {
      if(this.pageNumberOldValue !== this.pageParameters.pageNumber)
      {
        this.getSearchedJobs();
      }
      this.pageNumberOldValue = this.pageParameters.pageNumber;
    }
  }

  ngOnInit(): void {
    this.subscription = this.sharedDataService.receiveValuesPageParameters().subscribe(response => this.pageParameters = response);
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  
  getSearchedJobs() {
    let model = new SearchJobs();
    model.searchJob = this.searchBar.value;
    this.informationService.getCompaniesSearchedByUser(model,this.pageParameters).subscribe(response=>{
      this.sharedValues.setPageForSearchBar = false;
      this.sharedValues.getjobs = response.result;
      this.itemEvent.emit(this.sharedValues);
      //this.getJobs = response.result;
      this.sharedDataService.sendValuesPagination(response.pagination);
    });
  }
}
