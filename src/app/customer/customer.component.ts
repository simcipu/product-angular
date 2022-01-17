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

  product!:Product;
  id!:string;
  customer=new Array<Customer>();
  constructor(private service:ProductService,private route: ActivatedRoute,private router: Router) { }

  ngOnInit(): void {
   
  
    this.route.params.subscribe(params => {
      this.id=params['serialNumber'];
    });

    this.service.getProductById(this.id).subscribe(response => 
      {
        this.product = response;
       
        console.log(this.product);

        this.customer=  this.product.customer;

        console.log(this.customer);
   
      });
     
  }

  comeBack():void{

    this.router.navigate(['product']);

  }

}
