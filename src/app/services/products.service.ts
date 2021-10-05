import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Products } from '../models/products';
import { retry, catchError } from 'rxjs/operators';

const productsURL="http://localhost:9001/products"
@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(public http:HttpClient) { }

  httpOptions ={
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  // get all products
  getAllProducts():Observable<Products[]>
  {
    return this.http.get<Products[]>(productsURL)
    .pipe(
      retry(0),
      catchError(this.errorHandler)
    );
  }

  //to delete a product
  //http://localhost:9001/products/01
  deleteProducts(prodId:number)
  {
    return this.http.delete(`${productsURL}/${prodId}`)
    .pipe(
      retry(0),
      catchError(this.errorHandler)
    )
  }

  //to add branch
  addProducts(products:Products):Observable<Products>
  {
    return this.http.post<Products>(productsURL,products,this.httpOptions)
    .pipe(
      retry(0),
      catchError(this.errorHandler)
    )
  }

  //get products by name
  getProductsByName(prodName:string):Observable<Products>{
    return this.http.get<Products>(`${productsURL}/getProductsByName/${prodName}`)
    .pipe(
      retry(0),
      catchError(this.errorHandler)
    )
  }

  //get products by category
  getProductsByCategory(category:string):Observable<Products>{
    return this.http.get<Products>(`${productsURL}/getProductsByCategory/${category}`)
    .pipe(
      retry(0),
      catchError(this.errorHandler)
    )
  }

  getProductsById(prodId:number):Observable<Products>
  {
    return this.http.get<Products>(`${productsURL}/${prodId}`)
    .pipe(
      retry(0),
      catchError(this.errorHandler)
    )
  }

  //update products
  updateProducts(products:Products):Observable<Products>{
    return this.http.put<Products>(productsURL,products,this.httpOptions)
    .pipe(
      retry(0),
      catchError(this.errorHandler)
    )
  }

  //Error Handler
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