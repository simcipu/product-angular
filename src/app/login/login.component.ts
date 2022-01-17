import { Component, OnInit } from '@angular/core';
import { AuthService} from "../services/auth.service";
import { JwtTokenRequest } from "../classes/JwtTokenRequest";
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

 jwtTokenRequest!:JwtTokenRequest

  messaggio = '';

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.jwtTokenRequest =new JwtTokenRequest('','');
  }


  login(): void {

    this.authService.getUtente(this.jwtTokenRequest).subscribe(res => {

      sessionStorage.setItem("Utente", JSON.stringify(res.utente));
      sessionStorage.setItem("AuthToken", res.token);

      this.router.navigate(['product']);
    return res;
  });

}

}