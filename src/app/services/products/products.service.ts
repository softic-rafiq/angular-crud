import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}

  addProduct(data: any) {
    return this.http.post<any>('http://localhost:3000/products', data);
  }
  updateProduct(data: any, id: any) {
    return this.http.put<any>('http://localhost:3000/products/' + id, data);
  }
  deleteProduct(id: any) {
    return this.http.delete<any>('http://localhost:3000/products/' + id);
  }

  getProducts() {
    return this.http.get<any>('http://localhost:3000/products');
  }
}
