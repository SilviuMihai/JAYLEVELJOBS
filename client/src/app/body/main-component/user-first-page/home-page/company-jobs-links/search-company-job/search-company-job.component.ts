import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { SearchJobs } from 'src/app/_models/informations/SearchJobs';
import { SharingDataServiceService } from 'src/app/_services/shared/sharing-data-service.service';

@Component({
  selector: 'app-search-company-job',
  templateUrl: './search-company-job.component.html',
  styleUrls: ['./search-company-job.component.css']
})
export class SearchCompanyJobComponent implements OnInit {

  searchBar = new FormControl('',[Validators.minLength(3),Validators.maxLength(50),Validators.required])

  //child component - to parent component event
  //this is the child component
  @Output() itemEvent = new EventEmitter<boolean>();
  
  constructor(private sharedDataService: SharingDataServiceService) { }

  ngOnInit(): void { }

  getSearchedJobs() {  
    let model = new SearchJobs();
    model.searchJob = this.searchBar.value;
    this.itemEvent.emit(false);
    this.sharedDataService.sendValueSearchJob(model);
  }
}
