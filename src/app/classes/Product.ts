
import {Customer} from "../classes/Customer";



export class Product{


    public serialNumber: string;
   public type: string;
   public  name: string;
  public customer: Array <Customer>;

    constructor(serialNumber:string,type:string,name:string,customer: Array <Customer>) {
        this.serialNumber = serialNumber;
        this.name = name;
        this.type = type;
        this.customer=customer;
       
      }

   

}