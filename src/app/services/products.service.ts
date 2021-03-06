import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ProductModel } from 'src/app/models/product.model';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private url = environment.apiUrl;

  constructor(
    private http: HttpClient,
  ) { }

  getProductsList(): Observable<ProductModel[]> {
    const url = `${this.url}/products`;
    return this.http.get<ProductModel[]>(url);
  }
}
