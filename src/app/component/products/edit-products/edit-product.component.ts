import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Products } from 'src/app/models/products';
import { ProductsService } from 'src/app/services/products.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  
  editProductsForm?:FormGroup
  products?:Products;
  errorMessage?:string
  ProductsExists?:string;
  prodId?:number;
  date=new Date();

  constructor(public activatedRoute:ActivatedRoute,public formBuilder:FormBuilder,public productsService:ProductsService,public router:Router) { }

  ngOnInit(): void {
    this.prodId=this.activatedRoute.snapshot.params['prodId'];
    console.log('branchId:',this.prodId)

    this.productsService.getProductsById(this.prodId)
    .subscribe(data=>{
      console.log(data)
      this.editProductsForm=this.formBuilder.group({
        prodId:[data.prodId,[Validators.required]],
        prodName:[data.prodName,[Validators.required]],
        prodPrice:[data.prodPrice,[Validators.required,Validators.min(1)]],
        category:[data.category,[Validators.required]]
    })
  })

  }

  updateProducts(){
    this.productsService.updateProducts(this.editProductsForm?.value)
    .subscribe(
      response=>{
        console.log(response);
        console.log("Updated successfully");
      },
      error=>{
        this.successNotification();
        this.back();
        console.log("Error in updation")

      }
    );
  }
  back()
  {
    this.router.navigate(['viewAll'])
  }

successNotification(){
  Swal.fire('Success', 'Product updated successfully', 'success')
}


}
