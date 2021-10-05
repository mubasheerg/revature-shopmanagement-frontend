import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { stringify } from 'querystring';
import { Customer } from 'src/app/models/customer';
import { Products } from 'src/app/models/products';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.css']
})
export class AddOrderComponent implements OnInit {

  constructor(public orderService:OrderService,public formBuilder:FormBuilder,public router:Router,public activatedRoute:ActivatedRoute) { }

  addOrderForm?:FormGroup;
  products?:Products
  customer?:Customer
  customerId?:number;
  errorMessage?:string;
  date=new Date();

  ngOnInit(): void {
    this.addOrderForm=this.addOrderForm.group({
    amount:['',[Validators.required]],
    prodId:[this.activatedRoute.snapshot.params['prodId']],
    customerId:[this.activatedRoute.snapshot.params['custId']],
    
    })
  }
}
