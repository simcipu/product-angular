import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JwtTokenRequest } from "../classes/JwtTokenRequest";
import { JwtTokenResponse } from "../classes/JwtTokenResponse";
import { Utenti } from '../classes/Utenti';
import { RequestUser } from '../classes/RequestUser';
import { StringMapWithRename } from '@angular/compiler/src/compiler_facade_interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private urlauth = 'http://localhost:8090/auth';
  private urlauthvalidate = 'http://localhost:8090/auth/validate';
  private urlauthUser = 'http://localhost:8090/auth/userid';
  private urlauthInserisci = 'http://localhost:8090/auth/inserisci';
  private urlauthUtenti = 'http://localhost:8090/auth/utenti';
  private urlauthUtentiUpdate = 'http://localhost:8090/auth/update';
  private urlauthUtentiDelete= 'http://localhost:8090/auth/delete';
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

  getUser(id:string) {

    return this.http.get<Utenti>(this.urlauthUser + '/' + id);

  }

  deleteUser(userId:string): Observable<HttpResponse<any>> {

    return this.http.delete<HttpResponse<any>>(this.urlauthUtentiDelete+'/'+userId);

  }

  getUsers() {

    return this.http.get<Utenti[]>(this.urlauthUtenti);
  }

  update(utenti:Utenti,change:boolean): Observable<HttpResponse<any>>{
   return this.http.post<HttpResponse<any>>(this.urlauthUtentiUpdate+'/'+change, utenti);
  }

inserisciUser(requestUser:RequestUser): Observable<HttpResponse<any>>{
 return this.http.post<HttpResponse<any>>(this.urlauthInserisci, requestUser);
}

  public validateToken(username:string,token:string): Observable<Boolean>{

    return this.http.get<Boolean>(this.urlauthvalidate + '/' + username+"/"+token);

}
  isLogged = () => (sessionStorage.getItem("Utente") != null) ? true : false;
  clearAll = () => sessionStorage.removeItem("Utente");

}
