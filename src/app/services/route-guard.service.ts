import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from './auth.service';



@Injectable({
  providedIn: 'root'
})
export class RouteGuardService implements CanActivate  {

  token : any = '';
  ruoli: string[] = [];

  constructor(private JwtAuth: AuthService, private route: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state:  RouterStateSnapshot)  {

    this.token = this.JwtAuth.getAuthToken();

    const helper = new JwtHelperService();
    if(this.token){
    const decodedToken = helper.decodeToken(this.token);
    this.ruoli = decodedToken['authorities'];
    }

    if (!this.JwtAuth.isLogged())
    {
      this.route.navigate(['login']);
      return false;
    }
    else
    {
      if (route.data.roles == null || route.data.roles.length === 0)
        return true;
      else if (this.ruoli?.some(r => route.data.roles.includes(r)))
        return true;
      else
      {
        this.route.navigate(['forbidden']);
        return false;
      }
    }
  }
}
