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

  /* 
   * Value Sent from the post-company-jobs component(parent component being company-jobs-links): 
   * - child component - to parent component event
   * - this is the child component 
   */
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
    shortDescription: new FormControl('',[Validators.minLength(10),Validators.maxLength(80)]),
    startDate: new FormControl(null),
    endDate: new FormControl(null)
  });

  postJobs()
  {
    this.informationService.postCompanyLink(this.postJobForm.value).subscribe(()=>
    {
      //Value that is emited towards the parent component(company-jobs-links)
      this.itemEvent.emit(true);
      this.toastr.success("Job Added !");
      this.router.navigateByUrl('/companies-jobs-shared');
    });
  }

}
