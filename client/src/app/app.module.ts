import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavBarComponent } from './header/nav-bar/nav-bar.component';
import { SideBarComponent } from './body/side-bar/side-bar.component';
import { FooterBarComponent } from './footer/footer-bar/footer-bar.component';
import { TestComponentComponent } from './testing-component/test-component/test-component.component';
import { UserFirstPageComponent } from './body/main-component/user-first-page/user-first-page.component';
import { LoginPageComponent } from './body/main-component/account/login-page/login-page.component';
import { RegisterPageComponent } from './body/main-component/account/register-page/register-page.component';
import { ForgotPasswordPageComponent } from './body/main-component/account/forgot-password-page/forgot-password-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LearningsDocumentationComponent } from './body/main-component/user-first-page/home-page/learnings-documentation/learnings-documentation.component';
import { SharedModule } from './_modules/shared.module';
import { EmailConfirmationComponent } from './body/main-component/account/email/email-confirmation/email-confirmation.component';
import { ApprovingAccountByemailComponent } from './body/main-component/account/email/approving-account-byemail/approving-account-byemail.component';
import { ChangePasswordComponent } from './body/main-component/account/change-password/change-password.component';
import { FormsModule } from '@angular/forms';
import { ResetPasswordComponent } from './body/main-component/account/reset-password/reset-password.component';
import { TextInputComponent } from './_forms/text-input/text-input.component';
import { TestErrorsComponent } from './errors/test-errors/test-errors.component';
import { ErrorInterceptor } from './_interceptors/error.interceptor';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { ToastrModule } from 'ngx-toastr';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    SideBarComponent,
    FooterBarComponent,
    TestComponentComponent,
    UserFirstPageComponent,
    LoginPageComponent,
    RegisterPageComponent,
    ForgotPasswordPageComponent,
    LearningsDocumentationComponent,
    EmailConfirmationComponent,
    ApprovingAccountByemailComponent,
    ChangePasswordComponent,
    ResetPasswordComponent,
    TextInputComponent,
    TestErrorsComponent,
    NotFoundComponent,
    ServerErrorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    ToastrModule.forRoot({positionClass: 'toast-bottom-right'}), // ToastrModule added
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
