import { Component, OnDestroy, OnInit} from '@angular/core';
import {Product} from "../classes/Product";
import {Customer} from "../classes/Customer";
import {ProductService} from "../services/product.service";
import {ActivatedRoute, Router} from '@angular/router';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit,OnDestroy {

  prod!:Product;
  cust!:Customer;
  id!:string;
  show!:boolean;
  customer=new Array<Customer>();
  subscription!: Subscription
  subscription1!: Subscription
  serialNumber!:string;
  constructor(private service:ProductService,private route: ActivatedRoute,private router: Router) { }


  ngOnInit(): void {
    this.prod=new Product('','','',this.customer);
    this.cust=new Customer();
    this.route.params.subscribe(params => {
      this.id=params['serialNumber'];
    });

   this.subscription= this.service.getProductById(this.id).subscribe(response => 
      {
        this.prod = response;

        this.customer=  this.prod.customer;
        this.serialNumber = this.prod.serialNumber;
   
      });
     
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
 
   }

   saveProduct():void{
    this.subscription1 = this.service.update(this.prod).subscribe(param => { 
        if(param){
          window.alert("saved")
        }
        return param });
  }

  delete(custumer:Customer) {

    if(this.prod?.customer){
      const index =this.prod.customer.indexOf(custumer);
      this.prod.customer.splice(index,1);
  }

}

  ngOnDestroy(): void {

    if(this.subscription1)
    this.subscription1.unsubscribe()
    if(this.subscription)
    this.subscription.unsubscribe()
  }
}
