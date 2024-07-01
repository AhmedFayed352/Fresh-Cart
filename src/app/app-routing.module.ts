import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { VerifyResetCodeComponent } from './components/verify-reset-code/verify-reset-code.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CartComponent } from './components/cart/cart.component';
import { ProductsComponent } from './components/products/products.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { BrandsComponent } from './components/brands/brands.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { authGuard } from './Guards/auth.guard';
import { noAuthGuard } from './Guards/no-auth.guard';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ProductCategoryComponent } from './components/product-category/product-category.component';
import { ProductBrandComponent } from './components/product-brand/product-brand.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', canActivate: [authGuard], component: HomeComponent},
  {path: 'cart', canActivate: [authGuard], component: CartComponent},
  {path: 'products', canActivate: [authGuard], component: ProductsComponent},
  {path: 'categories', canActivate: [authGuard], component: CategoriesComponent},
  {path: 'brands', canActivate: [authGuard], component: BrandsComponent},
  {path: 'wishlist', canActivate: [authGuard], component: WishlistComponent},
  {path: 'product/:id', canActivate: [authGuard], component: ProductDetailsComponent},
  {path: 'category/:categoryId', canActivate: [authGuard], component: ProductCategoryComponent},
  {path: 'brand/:brandId', canActivate: [authGuard], component: ProductBrandComponent},

  {path: 'login', canActivate: [noAuthGuard], component: LoginComponent},
  {path: 'register', canActivate: [noAuthGuard], component: RegisterComponent},
  {path: 'forget-password', canActivate: [noAuthGuard], component: ForgetPasswordComponent},
  {path: 'verify-reset-code', canActivate: [noAuthGuard], component: VerifyResetCodeComponent},
  {path: 'reset-password', canActivate: [noAuthGuard], component: ResetPasswordComponent},
  {path: '**', component: NotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
