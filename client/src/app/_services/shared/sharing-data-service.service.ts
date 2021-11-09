import { Injectable } from '@angular/core';
import { AsyncSubject, BehaviorSubject, ReplaySubject, Subject } from 'rxjs';
import { PageParameters } from 'src/app/_models/pagination/PageParameters';
import { Pagination } from 'src/app/_models/pagination/pagination';

@Injectable({
  providedIn: 'root'
})
export class SharingDataServiceService {

  constructor() {}

  pagination = new Pagination();
  pageParameters = new PageParameters();
  
   private sharedDataPagination = new ReplaySubject<Pagination>();
   private sharedDataPageParameters = new ReplaySubject<PageParameters>();
  
  /* Pagination */
  receiveValuesPagination() {
    return this.sharedDataPagination.asObservable();
  }

  sendValuesPagination(valuesSent: Pagination) {
    this.sharedDataPagination.next(valuesSent);
  }
  /* Pagination */

  /* PageParameters */
  receiveValuesPageParameters() {
    return this.sharedDataPageParameters.asObservable();
  }

  sendValuesPageParameters(valuesSent: PageParameters) {
    this.sharedDataPageParameters.next(valuesSent);
  }
  /* PageParameters */
}
