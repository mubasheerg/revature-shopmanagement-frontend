import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'shopmanagement-app';

constructor(public router:Router){}
  ngOnInit(): void {
    this.router.navigate(['home']) 
  } 
}