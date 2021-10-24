import { HttpClient , HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { from, Observable, ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { CustomEncoder } from 'src/app/shared/Account/custom-encoder';
import { ForgotPassword } from 'src/app/_models/account/forgotpassword';
import { RegisterUser } from 'src/app/_models/account/registeruser';
import { ResetPassword } from 'src/app/_models/account/resetpassword';
import { User } from 'src/app/_models/account/user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient, private router: Router) { }

  baseUrl = 'https://localhost:5001/api/';

  //To store our user and the buffer having the size of 1 element
  //ReplySubject: Observable is like a buffer object that stores objects
  //and than will emit the last value inside it or how many we want
  //To emit the values, a subscriber needs to subscribe something in the buffer
  private currentUserSource = new ReplaySubject<User>(1);
  currentUser$ = this.currentUserSource.asObservable();

  setCurrentUser(user:User)
  {
    this.currentUserSource.next(user);
  }
 

  //Login POST
  login(model:any)
  {
    return this.http.post(this.baseUrl +'account/login-user',model).pipe(
      //using map to get the response from the server
      map((response: User) =>{
        //get the user
        const user = response;
        if(user)
        {
          //puts the user object (converting it to string) in the local storage of the browser
          //name of that particular string object will be 'user'
           localStorage.setItem('userjayleveljobs',JSON.stringify(user));
           this.currentUserSource.next(user);
        }
      })
    )
  }

  //LOGOUT
  logout()
  {
    localStorage.removeItem('userjayleveljobs');
    this.currentUserSource.next(null);

    //This was created because, the component must re-trigger so it can show the new elements when the user logs out.
    //Example being the component CompanyJobsLinks which shows different elements when the user is logged in or logged out.
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
    });
  }

  //Register POST
  register(model:RegisterUser)
  {
    return this.http.post(this.baseUrl +'account/register/',model);
  }

  //Confirm EMAIL GET
  emailconfirmation(id:string,token:string)
  {
    //class CustomEncoder() used for encoding/decoding - token
    let params = new HttpParams({ encoder: new CustomEncoder() });

    //parameters that will have the values, received from the component(approving-account-byemail)
    params = params.append('userId', id);
    params = params.append('token', token);

    //passing the query paramaters
      return this.http.get(this.baseUrl + 'account/confirm-email',{params: params}); //?userId='+id+'&token='+token);
  }

  //Forgot Password POST
  forgotpassword(model:ForgotPassword)
  {
    return this.http.post(this.baseUrl + 'account/forgot-password/',model);
  }

  //Reset Password POST
  resetpassword(model:ResetPassword)
  {
    return this.http.post(this.baseUrl + 'account/reset-password',model);
  }

  //Change Password POST
  changepassword(model:any)
  {
    return this.http.post(this.baseUrl + 'account/change-password',model);
  }

}
