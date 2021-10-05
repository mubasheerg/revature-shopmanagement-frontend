import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Products } from 'src/app/models/products';
import { ProductsService } from 'src/app/services/products.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-all-product',
  templateUrl: './view-all-product.component.html',
  styleUrls: ['./view-all-product.component.css']
})
export class ViewAllProductComponent implements OnInit {

  errorMessage?:string;
  products:Products[]=[];
  show?:boolean
  searchProductsForm?:FormGroup
  prodId?:number
  searchProductId:boolean=false;
  searches?:any
  tt:boolean=true;
  txtValue:any=null;

  constructor(public productsService:ProductsService,public router:Router,public formBuiler:FormBuilder) { }

  ngOnInit(): void {
    this.viewAllProducts();
    this.searchProductsForm=this.formBuiler.group({
      prodId:['',Validators.required]
    })
  }

  //to get all products
  viewAllProducts()
  {
    this.productsService.getAllProducts().subscribe(
      (data:any[])=>{
        this.show=true;
        console.log("Getting all products");
        if(data==null){
          this.errorMessage="No data found"
          console.log(this.errorMessage)
        }
        else{
          console.log(data);
          this.products=data;
        }
      },err=>this.errorMessage=err)
  }

  //to delete products
  deleteProducts(prodId:any)
  {
    console.log("Product Id to delete"+prodId)
    this.productsService.deleteProducts(prodId)
    .subscribe(
      response=>{
        console.log("response"+response)
      },
      error=>{
        console.log("Product with id "+prodId+"deleted successfully");
        this.viewAllProducts();
        console.log(error)
      }
    );    
  }

  //to search by name
  viewProductsByName(prodName:string){
    this.productsService.getProductsByName(prodName).subscribe(
      (data:any)=>{
        console.log(data)
      })
  }

  searchProducts(){
    console.log(this.searchProductId)
    console.log(this.searchProductsForm?.get('prodId')?.value)
    if(this.txtValue==null){
      this.viewAllProducts();
    }
    else{
      this.productsService.getProductsById(this.searchProductsForm?.get('prodId')?.value)
      .subscribe(res=>{
        this.products=[];
        this.products[0]=res;
        console.log(this.products[0])
        if(this.products[0]==null){
          this.tt=false;
          this.errorMessage="No data found"
          this.viewAllProducts();
        }
        else{
          this.errorMessage=""
          this.tt=true;
        }
      })
    
    }
  }

  addProducts(){
    this.router.navigate(['addProducts'])
  }

  getProductsById(){}
  showAdminop(){
    this.router.navigate(['adminop'])
  }

  alertConfirmation(prodId:any){
    Swal.fire({
      title: 'Are you sure?',
      text: 'This process is irreversible.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        this.deleteProducts(prodId)
        Swal.fire('Removed!','Product removed successfully!','success')
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled','Product not deleted','error')
      }
    })
  }  

  editProducts(){
    this.router.navigate(['editProduct',this.prodId])
  }


}
