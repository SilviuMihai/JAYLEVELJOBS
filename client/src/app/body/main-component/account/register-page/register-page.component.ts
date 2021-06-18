import { Component, OnInit } from '@angular/core';
import { AbstractControl,FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { matchValues } from 'src/app/_forms/match-value';
import { AccountService } from 'src/app/_services/account_services/account.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {

  registerForm:FormGroup;

  constructor(private accountService: AccountService, private router: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(){
  this.registerForm = this.fb.group({
    username: new FormControl('',[Validators.required,Validators.minLength(4),
      Validators.maxLength(32),Validators.pattern('^[a-zA-Z\-]+$')]),
    email: new FormControl('',[Validators.required,Validators.email]),
    password: new FormControl('',[Validators.required,Validators.minLength(8),
      Validators.maxLength(32),
      Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,32}$')]),
    confirmpassword: new FormControl('',[Validators.required, matchValues('password')]),
    //Pre-defined the value to false, will change to true, when the user sets it
    hrusercheck: new FormControl(false,Validators.required),
    company: new FormControl('',Validators.pattern('^[a-zA-Z\-]+$'))
  });

  this.registerForm.controls.password.valueChanges.subscribe(() => {
    this.registerForm.controls.confirmpassword.updateValueAndValidity();
  })
}


  register()
  {
    //One way to set the checkbox to false when is unchecked
    /* if(this.registerForm.value.companyrecruiter == "")
    {
      this.registerForm.get("companyrecruiter").setValue(false);
    } */
    this.accountService.register(this.registerForm.value).subscribe();
    this.router.navigateByUrl('email-alert');
  }

}
