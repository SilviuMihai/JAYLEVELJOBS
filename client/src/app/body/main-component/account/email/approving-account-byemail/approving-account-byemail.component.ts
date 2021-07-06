import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/_services/account_services/account.service';

@Component({
  selector: 'app-approving-account-byemail',
  templateUrl: './approving-account-byemail.component.html',
  styleUrls: ['./approving-account-byemail.component.css']
})
export class ApprovingAccountByemailComponent implements OnInit {

  userId:string;
  token:string;

  constructor(private accountService: AccountService, private route: ActivatedRoute,
    private router: Router, private toastr: ToastrService) { }
  
  ngOnInit(): void {
    this.emailconfirmation();
  }


  private emailconfirmation()
  {
    //using route to get the userId and the token from the query link from the registration
    this.route.queryParams
    .subscribe(params => {
      this.userId = params.userId;
      this.token = params.token;
    });
      //passing the values
      this.accountService.emailconfirmation(this.userId,this.token).subscribe();
  }
}
