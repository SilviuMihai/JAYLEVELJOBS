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
  //To check if "urlRegex" is of type Regex, go with the cursor above the "urlRegex"
  urlRegextest = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
  urlRegex = /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i

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
    url: new FormControl('',[Validators.required,Validators.pattern(this.urlRegex)]),
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
