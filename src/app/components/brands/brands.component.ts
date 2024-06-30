import { Component, OnInit } from '@angular/core';
import { IBrand } from 'src/app/interfaces/ibrand';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css']
})
export class BrandsComponent implements OnInit{

  allBrands: IBrand[] = [];

  constructor(private _ProductService:ProductService){}

  ngOnInit(): void {
    this._ProductService.getAllBrands().subscribe({
      next: (response) => {
        this.allBrands = response.data;
      },
      error: (err) => {console.log(err)}
    });
  }
}
