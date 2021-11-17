import { Component, DoCheck, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { SharedValuesCompanyJobsLinks } from 'src/app/shared/Information/SharedCompanyJobsLinks';
import { CompanyLinks } from 'src/app/_models/informations/CompanyLinks';
import { SearchJobs } from 'src/app/_models/informations/SearchJobs';
import { PageParameters } from 'src/app/_models/pagination/PageParameters';
import { Pagination } from 'src/app/_models/pagination/pagination';
import { InformationsService } from 'src/app/_services/informations_services/informations.service';
import { SharingDataServiceService } from 'src/app/_services/shared/sharing-data-service.service';

@Component({
  selector: 'app-pagination-for-searching',
  templateUrl: './pagination-for-searching.component.html',
  styleUrls: ['./pagination-for-searching.component.css']
})
export class PaginationForSearchingComponent implements OnInit, OnDestroy, DoCheck {

  modelSearchedValue = new SearchJobs();
  modelSearchedOldValue = "";
   /* Pagination */
   pagination = new Pagination();
   pageParameters = new PageParameters();
   subscription_two: Subscription;
   /* --- */
  getJobs: CompanyLinks[];
  //child component - to parent component event
  //this is the child component
  @Output() itemEvent = new EventEmitter<CompanyLinks[]>();

  constructor(private informationService: InformationsService, private sharedDataService: SharingDataServiceService) { }
  
  ngDoCheck(): void {
    if(this.modelSearchedValue.searchJob != this.modelSearchedOldValue) {
      this.getSearchedJobs();
    }
    this.modelSearchedOldValue = this.modelSearchedValue.searchJob;
  }
  
  ngOnDestroy(): void {
    this.subscription_two.unsubscribe();
  }

  ngOnInit(): void {
    this.subscription_two = this.sharedDataService.receiveValueSearchJob().subscribe(response => this.modelSearchedValue = response);
  }

  getSearchedJobs() {
    this.informationService.getCompaniesSearchedByUser(this.modelSearchedValue,this.pageParameters).subscribe(response=>{
      this.itemEvent.emit(response.result);
      this.pagination = response.pagination;
    });
  }

  pageChanged(event: any) {
    this.pageParameters.pageNumber = event.page;
    this.getSearchedJobs();
  }
}
