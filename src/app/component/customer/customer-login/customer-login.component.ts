import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from 'src/app/models/customer';
import { CustomerService } from 'src/app/services/customer.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-customer-login',
  templateUrl: './customer-login.component.html',
  styleUrls: ['./customer-login.component.css']
})
export class CustomerLoginComponent implements OnInit {

customerLoginForm?:FormGroup;
errorMessage?:string;
customer?:Customer;
resetPassword?:boolean;
login?:boolean;

  constructor(public activatedRoute :ActivatedRoute,public customerService:CustomerService,public formBuilder:FormBuilder,public router: Router) { }

  ngOnInit(): void {
    this.login=true;
    this.customerLoginForm = this.formBuilder.group({
      custMail: ['', [Validators.required,Validators.email ]],
      password: ['', [Validators.required ,Validators.minLength(6)]],
  })
   }


   customerLogin(){
     this.customerService.customerLogin(this.customerLoginForm?.get('custMail')?.value,this.customerLoginForm?.get('custPwd')?.value,)
     .subscribe(
       (data)=>{
         this.customer=data;
         console.log(this.customer)
         if(data!=null)
         this.router.navigate(['customerDashboard',this.customer.custId])
         else{
           this.wrongLogin();
           this.router.navigate(['customerLogin'])
         }
       }
     )
   }
   forgetPassword()
   {
     this.customerService.getCustomerByEmail(this.getEmailForm.get('email').value).subscribe(data=>
       {
         if(data!=null){
           this.customerService.forgetPassword(this.getEmailForm.get('email').value).subscribe(
           (data)=>{
             console.log(data)
           },err=>{
             console.log(err)
             this.updated();
             this.forget();
         })
       }
       else{
         this.wrongLogin();
       }
       })
 
   }
   updated(){
     Swal.fire('Success', 'Your password sent to your Mail ', 'success')
   }
   forget()
   {
     this.login=!this.login;
     this.resetPassword=!this.resetPassword;
   }
 
 wrongLogin(){
   Swal.fire('Wrong', 'Your Login Credentials are not matched!Try again', 'error')
 }


 addcustomers(){
   this.router.navigate(['addcustomers'])
 }


}