import { Component, OnInit} from '@angular/core';
import {Product} from "../classes/Product";
import {Customer} from "../classes/Customer";
import {ProductService} from "../services/product.service";
import {ActivatedRoute, Router} from '@angular/router';



@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  prod!:Product;
  cust!:Customer;
  id!:string;
  show!:boolean;
  customer=new Array<Customer>();
  serialNumber!:string;
  constructor(private service:ProductService,private route: ActivatedRoute,private router: Router) { }

  ngOnInit(): void {
    this.prod=new Product('','','',this.customer);
    this.cust=new Customer();
    this.route.params.subscribe(params => {
      this.id=params['serialNumber'];
    });

    this.service.getProductById(this.id).subscribe(response => 
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
      this.service.update(this.prod).subscribe(param => { 
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
}
