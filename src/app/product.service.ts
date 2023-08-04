import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from './product';
import { environment } from 'src/environments/environment';
import { Http2ServerResponse } from 'http2';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = environment.apiBaseUrl + '/products';

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]>{
    return this.http.get<Product[]>(`${this.baseUrl}`);
  }

  getProductById(productId: number): Observable<any>{
    return this.http.get<Product>(`${this.baseUrl}/${productId}`);
  }

  addProduct(product: Product): Observable<Product>{
    return this.http.post<Product>(`${this.baseUrl}`, product);
  }

  updateProduct(productId: number, product: Product): Observable<Product>{
    return this.http.put<Product>(`${this.baseUrl}/${productId}`, product);
  }

  deleteProduct(productId: number): Observable<void>{
    return this.http.delete<void>(`${this.baseUrl}/${productId}`);
  }

  /*
  getUsers(): Observable<Meteo[]>{
    return this.http.get<Meteo[]>(`${this.baseUrl}`);
  }
  */
}
