import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Utenti } from '../classes/Utenti';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-utenti',
  templateUrl: './utenti.component.html',
  styleUrls: ['./utenti.component.css']
})
export class UtentiComponent implements OnInit,OnDestroy{

  utenti!:Utenti[];
  ute!:Utenti;
  subscription!: Subscription
  subscription1!: Subscription
  constructor(private authService:AuthService,private router: Router) { }
  ngOnDestroy(): void {
   if(this.subscription)
   this.subscription.unsubscribe

   if(this.subscription1)
   this.subscription1.unsubscribe
  }

  ngOnInit(): void {
this.subscription =this.authService.getUsers().subscribe(response =>{

      this.utenti = response;
      let utente = this.authService.loggedUser();
  
      if(utente){
  
       this.ute =JSON.parse(utente);
       console.log(this.ute)
        this.utenti.forEach(e => {

          if(e.id === this.ute.id){
   
           const index = this.utenti.indexOf(e)
           this.utenti.splice(index,1)
          
          }
        })
  

      }

     return  this.utenti;
    })
 
   
 
  }

  update(userId:string){

    
    this.router.navigate(['updateutenti',userId]);
  }

  delete(id:string){
    
      this.subscription1=this.authService.deleteUser(id).subscribe(param => {return param});
      window.location.reload();
    }

  reset() {
 
    
    window.location.reload();
  }
  comeBack():void{

    this.router.navigate(['product']);

  }


}
