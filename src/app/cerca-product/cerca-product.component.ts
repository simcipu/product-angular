import { Component, OnDestroy, OnInit } from '@angular/core';
import {Product} from "../classes/Product";
import { Router} from '@angular/router';
import {ProductService} from "../services/product.service";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cerca-product',
  templateUrl: './cerca-product.component.html',
  styleUrls: ['./cerca-product.component.css']
})
export class CercaProductComponent implements OnInit,OnDestroy {

  surname!:string;
  type!:string;
  product=new Array<Product>();
  subscription!: Subscription
  subscription1!: Subscription
  show!:boolean;
  constructor(private service:ProductService,private router: Router) { }


  ngOnInit(): void {
    this.show=false;
  }


  cerca(surname:string,type:string){
    this.product=new Array<Product>();
    this.subscription =this.service.getForType(type).subscribe(param=> {

  console.log(param);
if(this.product===null){
  this.show=false;
}else{

  param.forEach(p => this.product.push(p));
  this.show=true;
}

})

this.subscription1 =this.service.getForSurname(surname).subscribe(param=>{

  
  console.log(param);
if(this.product===null){
  this.show=false;
}else{
 
  param.forEach(p => this.product.push(p));
  this.show=true;
}

})

  }

  open(id:string) {
    this.router.navigate(['customer', id]);
  }
  
  ngOnDestroy(): void {
    if(this.subscription)
    this.subscription.unsubscribe();
    if(this.subscription1)
    this.subscription1.unsubscribe();
   }

}
