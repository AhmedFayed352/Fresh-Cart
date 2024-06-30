import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private _httpClient: HttpClient) { }

  getAllProducts() : Observable<any> {
    return this._httpClient.get<any>("https://ecommerce.routemisr.com/api/v1/products");
  }

  getProductDetailsById(id : string) :Observable<any> {
    return this._httpClient.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
  }

  getAllCategories() : Observable<any> {
    return this._httpClient.get("https://ecommerce.routemisr.com/api/v1/categories");
  }

  getProductByCategory(categoryId: string) : Observable<any> {
    return this._httpClient.get(`https://ecommerce.routemisr.com/api/v1/products?category[in]=${categoryId}`);
  }

  getAllBrands() : Observable<any>{
    return this._httpClient.get("https://ecommerce.routemisr.com/api/v1/brands");
  }

  getProductByBrand(brandId: string) : Observable<any> {
    return this._httpClient.get(`https://ecommerce.routemisr.com/api/v1/products?brand=${brandId}`);
  }
}
