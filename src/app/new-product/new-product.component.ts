import { Component, OnInit ,OnDestroy} from '@angular/core';
import {Product} from "../classes/Product";
import {ProductService} from "../services/product.service";
import { Router} from '@angular/router';
import { Customer } from '../classes/Customer';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit,OnDestroy {
  customer=new Array<Customer>();
  cust!:Customer;
  prod!:Product;
  dismissible:boolean = false;
  subscription!: Subscription

  constructor(private service:ProductService,private router: Router) { }

  ngOnDestroy(): void {
    if( this.subscription)
    this.subscription.unsubscribe();
  }
  show!:boolean;
  ngOnInit(): void {
  this.prod=new Product('','','',this.customer);
  this.cust=new Customer();
  }

  saveProduct(prod:Product):void{
    if(this.cust.name!=''){
      this.prod.customer.push(this.cust);
        }
    this.subscription=this.service.save(prod).subscribe(param => {
      if(param){
        window.alert("saved")
      }
  return param;
  
    });
   this.reset();
  }

  comeBack():void{

    this.router.navigate(['product']);
  }

  reset() {
    this.show=false;
    
    window.location.reload();
  }

  gotoNewCustmer() {
   this.show=true;
   if(this.cust.name!=''){
 this.prod.customer.push(this.cust);
 window.alert("Customer Added");
   }
   this.cust=new Customer();
   
  }

 

}
