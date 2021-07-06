import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { matchValues } from 'src/app/_forms/match-value';
import { ResetPassword } from 'src/app/_models/account/resetpassword';
import { AccountService } from 'src/app/_services/account_services/account.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  forgotpasswordForm: FormGroup;
  constructor(private accountService: AccountService ,private route: ActivatedRoute 
    ,private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getQueryValues();
    this.initializeForm();
  }

  email:string;
  token:string;

  initializeForm(){
  this.forgotpasswordForm = new FormGroup({
    password: new FormControl('',[Validators.required,Validators.minLength(8),
      Validators.maxLength(32),
      Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,32}$')]),
    confirmpassword: new FormControl('',[Validators.required, matchValues('password')])
  });
  this.forgotpasswordForm.controls.password.valueChanges.subscribe(() => {
    this.forgotpasswordForm.controls.confirmpassword.updateValueAndValidity();
  })
}

  private getQueryValues()
  {
     //using route to get the email and the token from the query link from the forgotpassword
     this.route.queryParams
     .subscribe(params => {
       this.email = params.email;
       this.token = params.token;
     });
  }

  resetpassword()
  {
      //was created a model, to be sent towards API
      let model = new ResetPassword();
      model.email = this.email;
      model.token = this.token;

      //to extract the values from the formgroup
      model.password = this.forgotpasswordForm.get('password').value;
      model.confirmpassword = this.forgotpasswordForm.get('confirmpassword').value;

      this.accountService.resetpassword(model).subscribe();
      this.router.navigateByUrl('login-page');
      this.toastr.success("Password was changed. Please Login !");
  }

}
