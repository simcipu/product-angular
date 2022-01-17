import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-token-exp',
  templateUrl: './token-exp.component.html',
  styleUrls: ['./token-exp.component.css']
})
export class TokenExpComponent implements OnInit {

  constructor(private route: Router) { }

  ngOnInit(): void {
  }
  goback(): void {
    this.route.navigate(['login']);
  }
}
