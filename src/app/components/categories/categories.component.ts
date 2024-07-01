import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ICategory } from 'src/app/interfaces/icategory';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit , OnDestroy {

  allCategories: ICategory[] = [];
  unDestroying!: Subscription;

  constructor(private _ProductService:ProductService){}

  ngOnInit(): void {
    this.unDestroying = this._ProductService.getAllCategories().subscribe({
      next:(response) => {this.allCategories = response.data},
      error: (err) => {console.log(err)}
    })
  }

  ngOnDestroy(): void {
    this.unDestroying.unsubscribe();
  }
}
