import { Component, OnInit ,OnDestroy} from '@angular/core';
import {Product} from "../classes/Product";
import {ProductService} from "../services/product.service";
import { Router} from '@angular/router';
import { Customer } from '../classes/Customer';


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
  constructor(private service:ProductService,private router: Router) { }
  show!:boolean;
  ngOnInit(): void {
  this.prod=new Product('','','',this.customer);
  this.cust=new Customer();
  }

  saveProduct():void{
    if(this.cust.name!=''){
      this.prod.customer.push(this.cust);
        }
    this.service.save(this.prod).subscribe(param => {
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

  ngOnDestroy(){

    this.service.save(this.prod).subscribe().unsubscribe();
  }

}
