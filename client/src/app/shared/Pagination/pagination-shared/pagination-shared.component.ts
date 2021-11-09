import { Component, DoCheck, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PageParameters } from 'src/app/_models/pagination/PageParameters';
import { Pagination } from 'src/app/_models/pagination/pagination';
import { SharingDataServiceService } from 'src/app/_services/shared/sharing-data-service.service';

@Component({
  selector: 'app-pagination-shared',
  templateUrl: './pagination-shared.component.html',
  styleUrls: ['./pagination-shared.component.css']
})
export class PaginationSharedComponent implements OnInit, OnDestroy {

  constructor(private sharedDataService: SharingDataServiceService) { }

  ngOnInit(): void {
    this.subscription = this.sharedDataService.receiveValuesPagination().subscribe(response => { this.pagination = response; });
  }
 
  ngOnDestroy() : void {
    this.subscription.unsubscribe();
  }
  subscription: Subscription;

  pagination = new Pagination();
  pageParameters = new PageParameters();

  pageChanged(event: any) {
    this.pageParameters.pageNumber = event.page;
    this.sharedDataService.sendValuesPageParameters(this.pageParameters);
  }

}
