import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from 'src/app/interfaces/iproduct';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.css']
})
export class ProductCategoryComponent implements OnInit{

  categoryId: string | null = null;
  allProducts: IProduct[] = [];

  constructor(private _ActivatedRoute: ActivatedRoute ,private _ProductService: ProductService , private _CartService:CartService){}

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe(
      (params) =>{
        this.categoryId = params.get('categoryId');
    });

    if(this.categoryId != null) {
      this._ProductService.getProductByCategory(this.categoryId).subscribe({
        next: (response) => {
          this.allProducts = response.data;
        },
        error: (err) => {console.log(err)}
      })
    }
  }

  addItemToCart(id:string) {
    this._CartService.addToCart(id).subscribe({
      next: (response) => {console.log(response)},
      error: (err) => {console.log(err)}
    })
  }
}
