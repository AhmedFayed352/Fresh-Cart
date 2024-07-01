import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IBrand } from 'src/app/interfaces/ibrand';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css']
})
export class BrandsComponent implements OnInit, OnDestroy{

  allBrands: IBrand[] = [];
  unDestroying!: Subscription;

  constructor(private _ProductService:ProductService){}

  ngOnInit(): void {
    this.unDestroying = this._ProductService.getAllBrands().subscribe({
      next: (response) => {
        this.allBrands = response.data;
      },
      error: (err) => {console.log(err)}
    });
  }

  ngOnDestroy(): void {
    this.unDestroying.unsubscribe();
  }
}
