import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JwtTokenRequest } from "../classes/JwtTokenRequest";
import { JwtTokenResponse } from "../classes/JwtTokenResponse";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private urlauth = 'http://localhost:8090/auth';
  private urlauthvalidate = 'http://localhost:8090/auth/validate';
  constructor(private http: HttpClient) { }

  public getUtente(jwtTokenRequest: JwtTokenRequest): Observable<JwtTokenResponse> {

    return this.http.post<JwtTokenResponse>(this.urlauth, jwtTokenRequest);
  }


  loggedUser = () => {

    let utente = sessionStorage.getItem("Utente");

    return (sessionStorage.getItem("Utente") != null) ? utente : "";
  }

  getAuthToken() {

    if (this.loggedUser())
      return sessionStorage.getItem("AuthToken");
    else
      return "";
  }

  public validateToken(username:string,token:string): Observable<Boolean>{

    return this.http.get<Boolean>(this.urlauthvalidate + '/' + username+"/"+token);

}
  isLogged = () => (sessionStorage.getItem("Utente") != null) ? true : false;
  clearAll = () => sessionStorage.removeItem("Utente");

}
