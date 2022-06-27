import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { Subscription } from 'rxjs';
import {Product} from "../classes/Product";
import {ProductService} from "../services/product.service";



@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit,OnDestroy {
 product!:Product[]
 subscription!: Subscription
 subscription1!: Subscription
  constructor(private service:ProductService,private router: Router) { }


  ngOnInit(): void {
    
this.subscription =this.service.getProduct().subscribe(response => 
  {
    this.product = response;

    return response;
  
  });

}
open(id:string) {
  this.router.navigate(['customer', id]);
}

delete(id:string) {
  this.subscription1= this.service.deleteById(id).subscribe(param=> {return param});
  window.location.reload();
}

modifica(id:string){

  this.router.navigate(['update/product', id]);

}

ngOnDestroy(): void {

  if(this.subscription)
  this.subscription.unsubscribe;
  if(this.subscription1)
  this.subscription1.unsubscribe;
}
}