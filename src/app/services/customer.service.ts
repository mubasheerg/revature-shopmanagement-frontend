import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Customer } from '../models/customer';

const customerURL="http://localhost:9001/customer"
@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(public http:HttpClient) { }

  httpOptions={
    headers:new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  getAllCustomers():Observable<Customer[]>
  {
    return this.http.get<Customer[]>(customerURL)
    .pipe(retry(0),
    catchError(this.errorHandler)
    );
  }

  deleteCustomer(custId:number){
    return this.http.delete(`${customerURL}/${custId}`)
    .pipe
    (
      retry(0),
      catchError(this.errorHandler)
    )
  }

  addCustomer(customer:Customer):Observable<Customer>{
    return this.http.post<Customer>(customerURL,customer,this.httpOptions)
    .pipe
    (
      retry(0),
      catchError(this.errorHandler)
    )
  }

  forgetPassword(custMail:string)
  {
    return this.http.put(`${customerURL}/forgetPassword/${custMail}`,this.httpOptions)
    .pipe
    (
      retry(0),
      catchError(this.errorHandler)
    )
  }

  getCustomerByPhoneNo(custPhone:string):Observable<Customer>
  {
    return this.http.get<Customer>(`${customerURL}/getCustomerByPhoneNo/${custPhone}`)
    .pipe(
      retry(0),
      catchError(this.errorHandler)
    )
  }

  getCustomerByMail(custMail:string):Observable<Customer>
  {
    return this.http.get<Customer>(`${customerURL}/getCustomerByMail/${custMail}`)
    .pipe(
      retry(0),
      catchError(this.errorHandler)
    )
  }

  customerLogin(custMail:string,custPwd:String):Observable<Customer>
  {
    return this.http.get<Customer>(`${customerURL}/customerLogin/${custMail}/${custPwd}`)
    .pipe(
      retry(0),
      catchError(this.errorHandler)
    )
  }

  updatePassword(custMail:string,newPassword:string)
 {
   console.log(newPassword)
   return this.http.put(`${customerURL}/updatePassword/${custMail}/${newPassword}`,this.httpOptions)
   .pipe
   (
     retry(1),
     catchError(this.errorHandler)
   )
 }

 errorHandler(error: { error: { message: string; }; status: any; message: any; }) {
  let errorMessage = '';
  if (error.error instanceof ErrorEvent) {
    // Get client-side error
    errorMessage = error.error.message;
  } else {
    // Get server-side message
    errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
  }

  switch (error.status) {
    case 200:   
    console.log("200's");
      break;
    case 401:
      break;
    case 403:
      break;
    case 0:
    case 400:
    case 405:
    case 406:
    case 409:
    case 500:
      break;
  }
  return throwError(errorMessage);
  }
}
