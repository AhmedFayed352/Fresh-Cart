import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { CarouselModule } from 'ngx-owl-carousel-o';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { CartComponent } from './components/cart/cart.component';
import { ProductsComponent } from './components/products/products.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { BrandsComponent } from './components/brands/brands.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { VerifyResetCodeComponent } from './components/verify-reset-code/verify-reset-code.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ProductComponent } from './components/product/product.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { HomeMainCarouselComponent } from './components/home-main-carousel/home-main-carousel.component';
import { HomeCategoriesCarouselComponent } from './components/home-categories-carousel/home-categories-carousel.component';
import { ProductCategoryComponent } from './components/product-category/product-category.component';
import { ProductBrandComponent } from './components/product-brand/product-brand.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { AuthInterceptor } from './Interceptors/auth.interceptor';
import { ShippingAddressComponent } from './components/shipping-address/shipping-address.component';
import { OrdersComponent } from './components/orders/orders.component';
import { AddpricePipe } from './Pipes/addprice.pipe';
import { TitleSlicePipe } from './Pipes/title-slice.pipe';
import { SearchPipe } from './Pipes/search.pipe';
import { ToastrModule } from 'ngx-toastr';
import { LoaderComponent } from './components/loader/loader.component';
import { LoaderInterceptor } from './Interceptors/loader.interceptor';
import { OrderItemsComponent } from './components/order-items/order-items.component';
import { ScrollToTopComponent } from './components/scroll-to-top/scroll-to-top.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    CartComponent,
    ProductsComponent,
    CategoriesComponent,
    BrandsComponent,
    NotfoundComponent,
    ForgetPasswordComponent,
    VerifyResetCodeComponent,
    ResetPasswordComponent,
    ProductComponent,
    ProductDetailsComponent,
    HomeMainCarouselComponent,
    HomeCategoriesCarouselComponent,
    ProductCategoryComponent,
    ProductBrandComponent,
    WishlistComponent,
    ShippingAddressComponent,
    OrdersComponent,
    AddpricePipe,
    TitleSlicePipe,
    SearchPipe,
    LoaderComponent,
    OrderItemsComponent,
    ScrollToTopComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule,
    BrowserAnimationsModule,
    CarouselModule,
    FormsModule,
    ToastrModule.forRoot({
      timeOut: 2000,
      positionClass: 'toast-bottom-left',
      closeButton: true,
      progressBar: true,
      progressAnimation: "increasing"
    })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }, 
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
