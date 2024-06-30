import { ICategory } from './../../interfaces/icategory';
import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-home-categories-carousel',
  templateUrl: './home-categories-carousel.component.html',
  styleUrls: ['./home-categories-carousel.component.css']
})
export class HomeCategoriesCarouselComponent implements OnInit {

  allCategories: ICategory[] = [];
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    items: 7,
    nav: false,
    autoplay:true,
    autoplayHoverPause:true
  }

  constructor(private _ProductService: ProductService){}

  ngOnInit() {
    this._ProductService.getAllCategories().subscribe({
      next: (response) => {this.allCategories = response.data},
      error: (err) => {console.log(err)}
    })
  }
}
