import { Component, OnInit } from '@angular/core';
import { AbstractControl, Form, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { matchValues } from 'src/app/_forms/match-value';
import { AccountService } from 'src/app/_services/account_services/account.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  changepasswordForm: FormGroup;

  constructor(private accountService: AccountService, private router: Router) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm()
  {
  this.changepasswordForm = new FormGroup({
    email: new FormControl('',[Validators.required,Validators.email]),
    currentpassword: new FormControl('',Validators.required),
    newpassword: new FormControl('',[Validators.required,Validators.minLength(8),
      Validators.maxLength(32),
      Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,32}$')]),
    confirmpassword: new FormControl('',[Validators.required, matchValues('newpassword')])
  });
  this.changepasswordForm.controls.newpassword.valueChanges.subscribe(() => {
    this.changepasswordForm.controls.confirmpassword.updateValueAndValidity();
   })
  }
  


  changepassword()
  {
      this.accountService.changepassword(this.changepasswordForm.value).subscribe(()=>{
        this.accountService.logout();
        this.router.navigateByUrl('/');
      });
  }

}
