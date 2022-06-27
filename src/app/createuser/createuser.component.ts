import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { RequestUser } from '../classes/RequestUser';
import { Utenti } from '../classes/Utenti';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-createuser',
  templateUrl: './createuser.component.html',
  styleUrls: ['./createuser.component.css']
})
export class CreateuserComponent implements OnInit,OnDestroy {

  constructor(private authService:AuthService,private router: Router) { }

ruoliSelected!:string[];
request!:RequestUser;
utente!:Utenti;
ruoli!:string;
validate!:boolean;
subscription!: Subscription


  ngOnInit(): void {

  }

  comeBack(){
    this.router.navigate(['login']);
  }

  save(request:RequestUser){
console.log(this.request)
    this.authService.inserisciUser(this.request).subscribe(param =>{return param});
    window.alert("new user entered");
 
  }
  
  reset(){
    this.validate=false;
    this.ruoliSelected =["ADMIN","USER"]
    this.utente=new Utenti("",'','',',',[]);
    this.request = new RequestUser('','',this.utente)

  }

  ngOnDestroy(): void {

    this.subscription.unsubscribe()
  }

selectRuoli(ruoliSelected:string[]){
  this.request.utente.ruoli=[];
if(ruoliSelected){
  ruoliSelected.forEach(r=>{
    this.request.utente?.ruoli.push(r);
  })
  
}

}}
