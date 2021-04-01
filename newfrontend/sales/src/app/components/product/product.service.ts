import { catchError, map } from 'rxjs/operators';
import { Product } from './../../product/product.model';
import { EMPTY, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { url } from 'node:inspector';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseURl ="http://localhost:3001/products";

  constructor ( private snack : MatSnackBar, private http : HttpClient) { }
  
  showMessage(msg : string , isError : boolean = false) : void{
    this.snack.open(msg, 'X', {
      duration:5000,
      horizontalPosition:"right",
      verticalPosition:"top",
      panelClass: isError ? ['msg-error'] : ['msg-sucess']
    })
  }

createProduct(product : Product) : Observable<Product>{
  return this.http.post<Product>(this.baseURl, product).pipe(
      map( (obj) => obj ), 
      catchError ( e => this.errorHadler(e))
      );
   }

getListProducts() : Observable<Product[]>{
  return this.http.get<Product[]>(this.baseURl)
}

getEditById(id : number) : Observable<Product>{
  const url = `${this.baseURl}/${id}`
  return this.http.get<Product>(url).pipe(
    map( (obj) => obj ), 
    catchError ( e => this.errorHadler(e))
    );

}

updateProduct(p : Product): Observable<Product>{
  const url = `${this.baseURl}/${p.id}`
  return this.http.put<Product>(url, p).pipe(
    map( (obj) => obj ), 
    catchError ( e => this.errorHadler(e))
    );
}

deleteProduct (id: number) : Observable<Product>  {
  const url = `${this.baseURl}/${id}`
  return this.http.delete<Product>(url).pipe(
    map( (obj) => obj ), 
    catchError ( e => this.errorHadler(e))
    );
}

errorHadler(e : any) : Observable<any>{
  console.log(e)
  this.showMessage("Ocorreu o seguinte erro => " + e, true);
  return EMPTY;
}
}