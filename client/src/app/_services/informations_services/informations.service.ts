import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CompanyLinks } from 'src/app/_models/informations/CompanyLinks';
import { SearchJobs } from 'src/app/_models/informations/SearchJobs';
import { AccountService } from '../account_services/account.service';

@Injectable({
  providedIn: 'root'
})
export class InformationsService {
  
 httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  constructor(private http: HttpClient, private accountService: AccountService) { }

  baseUrl = 'https://localhost:5001/api/';

  //POST a Job with a Link
  postCompanyLink(model: CompanyLinks) {
    return this.http.post(this.baseUrl + "information/post-companies-jobs-links/",model);
  }

  //GET Jobs Links
  getCompaniesLink() {
    return this.http.get<CompanyLinks[]>(this.baseUrl + "information/get-companies-jobs-links/");
  }

  //POST Request -Search functionality by using a POST and returning the values
  getCompaniesSearchedByUser(model: SearchJobs) {
    return this.http.post<CompanyLinks[]>(this.baseUrl + "information/search-jobs-setbyusers/",model);
  }

  //PUT Request - reports a link that may contain a bad link
  reportCompanyJobLink(id:number){
    return this.http.put(this.baseUrl+"information/reported-link/"+id,{});
  }

  //PUT Request - reports that the link is not available anymore
  linkNotAvailable(id:number){
    return this.http.put(this.baseUrl+"information/link-not-available/"+id,{});
  }
}
