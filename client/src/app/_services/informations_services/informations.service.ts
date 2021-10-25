import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { CompanyLinks } from 'src/app/_models/informations/CompanyLinks';
import { SearchJobs } from 'src/app/_models/informations/SearchJobs';
import { PageParameters } from 'src/app/_models/pagination/PageParameters';
import { PaginatedResult } from 'src/app/_models/pagination/pagination';
import { AccountService } from '../account_services/account.service';

@Injectable({
  providedIn: 'root'
})
//Service object will not be destroyed, during the lifetime of the app
//Note: only components will get destroyed after the user changes components
export class InformationsService {
  
 httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  //Used for pagination
  paginatedResult: PaginatedResult<CompanyLinks[]> = new PaginatedResult<CompanyLinks[]>();

  //Used for caching in the memory of the browser so that
  //it doesn't make at every change of the page a request to the server
  companyJobsLinksCache =  new Map();

  //Check if the user is logged In or logged Out
  userStatus = false;

  constructor(private http: HttpClient, private accountService: AccountService) {  }

  baseUrl = 'https://localhost:5001/api/';

  //POST Request - Post a Job with a Link
  postCompanyLink(model: CompanyLinks) {
    return this.http.post(this.baseUrl + "information/post-companies-jobs-links/",model);
  }

  //GET Request - Gets Jobs Links
  getCompaniesLink(pageParameters:PageParameters) {

    //Gets the initial values
    var response = this.companyJobsLinksCache.get(Object.values(pageParameters).join('-'));

    if(!(this.userStatus === this.getUserStatus())) { // Checks if the user is logged in or logged out
      this.companyJobsLinksCache.clear(); // Clears the cache, when the user changes status from logged in to logged out or vice versa
      response = null; //Was set the value null, because the user change their status - logged out or logged in
    }
    //If the response is empty will not return the cached values
        if(response) {
          //if(this.userStatus === this.getUserStatus()) { // Checks if the user is logged in or logged out
            return of(response).pipe(map(response => {
              //PaginatedResult.result is getting the values about the Companies
              //doesn't need the values about the pagination, because already has them
              this.paginatedResult.result = response.body;
              return this.paginatedResult;
            }));
         /*  }
          else {
            this.companyJobsLinksCache.clear(); // Clear the cache, when the user changes status from logged in to logged out or vice versa
          } */
        }
        this.userStatus = this.getUserStatus(); // Update the variable, so we can check the status, because the service object is not destroyed
    

    let params = new HttpParams();

    if(pageParameters.pageNumber !== null && pageParameters.pageSize !== null) {
      params = params.append('pageNumber', pageParameters.pageNumber.toString());
      params = params.append('pageSize', pageParameters.pageSize.toString());
    }
    return this.http.get<CompanyLinks[]>(this.baseUrl + "information/get-companies-jobs-links",
    {observe: 'response', params})
    .pipe(map(response => {
      //PaginatedResult.result is getting the values about the Companies
      this.paginatedResult.result = response.body;
      if(response.headers.get('Pagination') !== null) {
        //PaginatedResult.pagination is getting the values about the pagination
        this.paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
      }

      //After it gets the values from the server, it will cache the response
      this.companyJobsLinksCache.set(Object.values(pageParameters).join('-'),response);
      
      return this.paginatedResult;
    }));
  }

  //POST Request - Search functionality by using a POST and returning the values
  getCompaniesSearchedByUser(model: SearchJobs) {
    return this.http.post<CompanyLinks[]>(this.baseUrl + "information/search-jobs-setbyusers/",model);
  }

  //PUT Request - Reports a link that may contain a bad link
  reportCompanyJobLink(id:number){
    return this.http.put(this.baseUrl+"information/reported-link/"+id,{});
  }

  //PUT Request - Reports that the link is not available anymore
  linkNotAvailable(id:number){
    return this.http.put(this.baseUrl+"information/link-not-available/"+id,{});
  }

  //Check if the user is logged In or logged Out
  getUserStatus() {
    let userStatus = false;
    this.accountService.currentUser$.subscribe(user => {
      if(user) {
        userStatus= true;
      }
      else {
        userStatus = false;
      }});
      return userStatus;
  }
}
