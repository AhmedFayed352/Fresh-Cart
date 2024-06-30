import { Component } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-home-main-carousel',
  templateUrl: './home-main-carousel.component.html',
  styleUrls: ['./home-main-carousel.component.css']
})
export class HomeMainCarouselComponent {

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    items: 1,
    nav: false,
    autoplay:true,
    autoplayHoverPause:true
  }

}
