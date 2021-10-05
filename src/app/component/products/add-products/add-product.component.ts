import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Products } from 'src/app/models/products';
import { ProductsService } from 'src/app/services/products.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  addProductForm?:FormGroup
  products?:Products;
  errorMessage?:string;
  ProductExists?:number;
  date=new Date();

  constructor(public activatedRoute:ActivatedRoute,public formBuilder:FormBuilder,public productService:ProductsService,public router:Router) { }

  ngOnInit(): void {
    this.addProductForm=this.formBuilder.group({
      prodName:['',[Validators.required]],
      prodPrice:['',[Validators.required,Validators.min(0)]],
      category:['',[Validators.required]]
    })
  }

//to add product
addProducts(){
  console.log(this.products=this.addProductForm?.value);
  this.products=this.addProductForm?.value;
      this.productService.addProducts(this.addProductForm?.value)
    .subscribe(
      res=>{
        console.log(res);
        console.log("Product added successfully");
      },
      error=>
      {
        this.successNotification();
        console.log("Error in adding product"+error)
        this.back();  
      }
    )    
  }


successNotification(){
  Swal.fire('Success','Product Added Successfully','success')
}
back(){
  this.router.navigate([''])
}
}
