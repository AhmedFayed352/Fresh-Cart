import { Component, OnInit } from '@angular/core';
import { ICategory } from 'src/app/interfaces/icategory';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  allCategories: ICategory[] = [];

  constructor(private _ProductService:ProductService){}

  ngOnInit(): void {
    this._ProductService.getAllCategories().subscribe({
      next:(response) => {this.allCategories = response.data},
      error: (err) => {console.log(err)}
    })
  }
}
