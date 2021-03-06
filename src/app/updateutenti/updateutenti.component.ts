import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Utenti } from '../classes/Utenti';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-updateutenti',
  templateUrl: './updateutenti.component.html',
  styleUrls: ['./updateutenti.component.css']
})
export class UpdateutentiComponent implements OnInit,OnDestroy {
  id!:string;
  utenti!:Utenti
  ruoliSelected!:string[];
  ruoli!:string;
  validate!:boolean;
  change!:boolean;
  newpass!:string;
  subscription!: Subscription
  subscription1!: Subscription

  constructor(private authService:AuthService,private route: ActivatedRoute,private router: Router) { }

  ngOnDestroy(): void {
    
    if(this.subscription)
    this.subscription.unsubscribe

    if(this.subscription1)
    this.subscription1.unsubscribe
  }

  ngOnInit(): void {
    this.change=false;
    this.validate=false;
    this.ruoliSelected =["ADMIN","USER"]
    this.utenti=new Utenti('','','',',',[]);
    this.route.params.subscribe(params => {
   
      this.id=params['userId'];
      console.log(this.id)
 
    });


    this.subscription= this.authService.getUser(this.id).subscribe(param=>{

      this.utenti=param;
      return param;
    })
  }


  changeActive(){

    this.change=true;
  }

changePass(newpass:string){
  this.change=true;
  if(!newpass){
    window.alert("insert new password!!");
  }

    this.utenti.password=newpass;
     this.authService.update(this.utenti,true).subscribe(param => {return param});
    window.alert("password changed");
    this.change=false;

}

reset(){
  this.change=false;
  this.newpass="";
}



  comeBack(){
    this.router.navigate(['utenti']);
  }

  save(utente:Utenti){
   
    this.subscription1= this.authService.update(utente,false).subscribe(param => {return param});
    window.alert("user updated");
  }

  selectRuoli(ruoliSelected:string[]){
    this.utenti.ruoli=[];
  if(ruoliSelected){
    ruoliSelected.forEach(r=>{
      this.utenti?.ruoli.push(r);
    })
    
  }
  
  }}
  

