import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApproveEmailGuard implements CanActivate {

  constructor(private router: Router, private toastr: ToastrService){}

  canActivate(
    route: ActivatedRouteSnapshot): boolean {
    
         /* "??" -> Nullish Coalescing works exactly like the logical OR operator, except you will 
    get the right side value when the left side value is undefined or null. */
    const userId:string = route.queryParams.userId ?? null;
    const token:string = route.queryParams.token ?? null;
  
    if(userId == null && token == null)
    {
      this.toastr.warning("Warning: Unauthorized !");
      this.router.navigateByUrl('/');
      return false;
    }
    return true;
  }
  
}
