import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordGuardGuard implements CanActivate {

  constructor(private router:Router, private toastr: ToastrService){

  }

  canActivate (route: ActivatedRouteSnapshot):boolean {

   /* "??" -> Nullish Coalescing works exactly like the logical OR operator, except you will 
    get the right side value when the left side value is undefined or null. */
    const email:string = route.queryParams.email ?? null;
    const token:string = route.queryParams.token ?? null;
  
    if(email == null && token == null)
    {
      this.toastr.warning("Warning: Unauthorized !");
      this.router.navigateByUrl('/');
      return false;
    }
    return true;
  }
  
}
