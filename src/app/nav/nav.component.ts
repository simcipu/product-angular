import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    
  }

  gotoAdd():void{

    this.router.navigate(['product/add']);
  }
  search():void{

    this.router.navigate(['cerca']);
  }

  logout(): void {
  
    this.router.navigate(['login']);


  }

}
