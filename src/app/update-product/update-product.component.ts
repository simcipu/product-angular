import { Component, OnInit } from '@angular/core';
import {Product} from "../classes/Product";
import {ProductService} from "../services/product.service";
import {ActivatedRoute, Router} from '@angular/router';
import { Customer } from '../classes/Customer';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {
  prod!:Product;
  id!:string;
  show!:boolean;
  customer=new Array<Customer>();
  
  constructor(private service:ProductService,private route: ActivatedRoute,private router: Router) { }

  ngOnInit(): void {
    this.prod=new Product('','','',this.customer);
this.show=false;
    this.route.params.subscribe(params => {
   
      this.id=params['serialNumber'];
     console.log(this.id);
 
    });

    this.service.getProductById(this.id).subscribe(response => 
      {
        this.prod = response;
       
        console.log(this.prod);

        if( this.prod.customer.length!=0&&this.prod.customer!=null){
          this.show=true;
            this.customer=this.prod.customer;
        }
   
      });
  }


  comeBack():void{

    this.router.navigate(['product']);

  }
  reset() {
    
    window.location.reload();
    this.prod=new Product('','','',this.customer);
    this.show=false;
        this.route.params.subscribe(params => {
       
          this.id=params['serialNumber'];
         console.log(this.id);
    
      /* */
     
        });
    
        this.service.getProductById(this.id).subscribe(response => 
          {
            this.prod = response;
           
            console.log(this.prod);
    
            if( this.prod.customer.length!=0&&this.prod.customer!=null){
              this.show=true;
                this.customer=this.prod.customer;
            }
       
          });
  }


  updateProduct():void{

    this.service.update(this.prod).subscribe(param=> console.log(param));
      }

}
