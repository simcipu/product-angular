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
export class NewProductComponent implements OnInit {
  customer=new Array<Customer>();
  cust!:Customer;
  prod!:Product;
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
this.service.save(this.prod).subscribe(param=> console.log(param));
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
   }
   console.log(this.prod);
   this.cust=new Customer();
  }

  OnDestroy(){

    this.service.save(this.prod).subscribe().unsubscribe();
  }

}
