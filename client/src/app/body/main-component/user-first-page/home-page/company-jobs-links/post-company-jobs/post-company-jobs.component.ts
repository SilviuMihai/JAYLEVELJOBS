import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { InformationsService } from 'src/app/_services/informations_services/informations.service';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-post-company-jobs',
  templateUrl: './post-company-jobs.component.html',
  styleUrls: ['./post-company-jobs.component.css']
})
export class PostCompanyJobsComponent implements OnInit {

  //child component - to parent component event
  //this is the child component
  @Output() itemEvent = new EventEmitter<boolean>();
  bsConfig: Partial<BsDatepickerConfig>;


  constructor(private informationService: InformationsService, private router: Router, private toastr: ToastrService) {

    this.bsConfig = 
    { 
    containerClass: 'theme-dark-blue',
    dateInputFormat: 'DD MMMM YYYY' 
    }

   }

  ngOnInit(): void {
  }

  postJobForm = new FormGroup({
    url: new FormControl('',[Validators.required]),
    nameUrl: new FormControl('',[Validators.minLength(3),Validators.maxLength(25),Validators.required]),
    shortDescription: new FormControl('',[Validators.minLength(10),Validators.maxLength(50)]),
    startDate: new FormControl(""),
    endDate: new FormControl(""),

  });

  postJobs()
  {
    this.informationService.postCompanyLink(this.postJobForm.value).subscribe(()=>
    {    
      this.itemEvent.emit(true);
      this.toastr.success("Job Added !");
      this.router.navigateByUrl('/companies-jobs-shared',{ queryParams: { pageNumber: 1 }});
    });
  }

}
