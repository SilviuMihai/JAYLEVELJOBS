import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChangePasswordComponent } from './body/main-component/account/change-password/change-password.component';
import { ApprovingAccountByemailComponent } from './body/main-component/account/email/approving-account-byemail/approving-account-byemail.component';
import { EmailConfirmationComponent } from './body/main-component/account/email/email-confirmation/email-confirmation.component';
import { ForgotPasswordPageComponent } from './body/main-component/account/forgot-password-page/forgot-password-page.component';
import { LoginPageComponent } from './body/main-component/account/login-page/login-page.component';
import { RegisterPageComponent } from './body/main-component/account/register-page/register-page.component';
import { ResetPasswordComponent } from './body/main-component/account/reset-password/reset-password.component';
import { LearningsDocumentationComponent } from './body/main-component/user-first-page/home-page/learnings-documentation/learnings-documentation.component';
import { UserFirstPageComponent } from './body/main-component/user-first-page/user-first-page.component'
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { TestErrorsComponent } from './errors/test-errors/test-errors.component';
import { ApproveEmailGuard } from './_guards/approve-email.guard';
import { AuthGuard } from './_guards/auth.guard';
import { ResetPasswordGuardGuard } from './_guards/reset-password-guard.guard';

//ORDER OF THE PATH'S MATTER
const routes: Routes = [
  { path:'', component: UserFirstPageComponent },
  { path:'login-page', component: LoginPageComponent },
  { path:'register-page', component: RegisterPageComponent, },
  { path:'forgot-password', component: ForgotPasswordPageComponent },
  { path:'learnings-documentation', component: LearningsDocumentationComponent },
  { path:'email-alert', component: EmailConfirmationComponent,  }, //guard maybe ?
  { path:'approve-email', component: ApprovingAccountByemailComponent, canActivate: [ApproveEmailGuard] },
  { path:'reset-password', component: ResetPasswordComponent, canActivate: [ResetPasswordGuardGuard] },
  { path:'errors', component: TestErrorsComponent },
  { path:'not-found', component: NotFoundComponent },
  { path:'server-error', component: ServerErrorComponent },
  //CAN ACTIVATE GUARD FOR A SINGLE LINK
  //{ path:'forgot-password', component: ForgotPasswordPageComponent, canActivate: [AuthGuard] },

  // can activate guards our links, meaning that, the link is available only if the user is logged in
  //CAN ACTIVATE GUARD FOR MULTIPLE LINKS
  {
    path:'',
    runGuardsAndResolvers:'always',
    canActivate: [AuthGuard],
    children: [
      //Change password - user must be authenticated
      { path:'change-password', component: ChangePasswordComponent }
    ]
  },
  { path:'**', component: NotFoundComponent, pathMatch: 'full' } //in case no other page works, will redirect the user towards the UserFirstPage

  //CAN ACTIVATE GUARD FOR A SINGLE LINK
  //{ path:'forgot-password', component: ForgotPasswordPageComponent, canActivate: [AuthGuard] }, 
  // can activate guards our links, meaning that, the link is available only if the user is logged in
  //CAN ACTIVATE GUARD FOR MULTIPLE LINKS
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
