import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AccountService } from '../_services/account_services/account.service';
import { User } from '../_models/account/user';
import { take } from 'rxjs/operators';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private accountService: AccountService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let currentUser: User;

    //one way to obtain the token from the localstorage
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => currentUser = user);
    
    //second way to obtain the token from the localstorage
    const idTokenString = localStorage.getItem("userjayleveljobs");
    const idToken:User = JSON.parse(idTokenString);
    

    if(idToken)
    {
      const cloned = request.clone({
        headers: request.headers.set("Authorization",
            `Bearer ${idToken.token}`)});

     /*  request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${currentUser.token}`
        }
      }) */
      return next.handle(cloned);
    }
    else{
      return next.handle(request);
    }
  }
}
