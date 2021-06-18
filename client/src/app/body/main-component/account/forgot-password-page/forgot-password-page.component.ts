import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ForgotPassword } from 'src/app/_models/account/forgotpassword';
import { AccountService } from 'src/app/_services/account_services/account.service';

@Component({
  selector: 'app-forgot-password-page',
  templateUrl: './forgot-password-page.component.html',
  styleUrls: ['./forgot-password-page.component.css']
})
export class ForgotPasswordPageComponent implements OnInit {

  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
  }
    email = new FormControl('',[Validators.required,Validators.email]);

    forgotPassword()
    {
      let model = new ForgotPassword();
      model.email = this.email.value;
        this.accountService.forgotpassword(model).subscribe();
    }
}
