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
       
        console.log(this.prod);

        this.customer=  this.prod.customer;
        this.serialNumber = this.prod.serialNumber;
        console.log(this.customer);
   
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
      console.log(this.cust);
    
    }
 
    
   }

   saveProduct():void{
      this.service.update(this.prod).subscribe(param => { return param });
    
  }

  delete(surname:string) {

    if(this.prod?.customer){
      this.prod.customer.forEach(c=>{

        if(c.surname === surname){
          const index = this.prod.customer.indexOf(c);
          this.prod.customer.splice(index);
      }
    })

    this.service.update(this.prod).subscribe(param => { return param });
    window.location.reload();
  }

}
}
