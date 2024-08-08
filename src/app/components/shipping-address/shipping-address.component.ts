import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-shipping-address',
  templateUrl: './shipping-address.component.html',
  styleUrls: ['./shipping-address.component.css']
})
export class ShippingAddressComponent implements OnInit , OnDestroy{

  isLoading: boolean = false;
  cartId: string | null = '';
  arr:Subscription[] =[];

  shippingAddressForm: FormGroup = new FormGroup({
    details: new FormControl(null , Validators.required),
    phone: new FormControl(null , [Validators.required , Validators.pattern(/^01[0125][0-9]{8}$/)]),
    city: new FormControl(null , Validators.required)
  });

  constructor( private _ActivatedRoute:ActivatedRoute ,
               private _OrdersService:OrdersService ,
               private _Router:Router ,
               private _CartService: CartService ,
               private toastr:ToastrService){}

  ngOnInit(): void {
    this.arr.push(this._ActivatedRoute.paramMap.subscribe(
      (params) => {
        this.cartId = params.get("cartId");
      }
    ));
  }

  redirectToPaymentPage(url : string) {
    window.location.href = url;
  }

  onlinePayment(form : FormGroup) {
    this.arr.push(this._OrdersService.onlinePayment(this.cartId , form.value).subscribe({
      next: (response) => {
        this.redirectToPaymentPage(response.session.url);
      },
      error: (err) => {console.log(err)}
    }));
  }

  cashPayment(form : FormGroup){
    this.arr.push(this._OrdersService.cashPayment(this.cartId , form.value).subscribe({
      next: (response) => {
        console.log(response);
        this._Router.navigate(["/allorders"]);
        this._CartService.cartItemsNum.next(0);
      },
      error: (err) => {
        console.log(err);
        if(err.status == 404) {
          this.toastr.error(`${err.error.message}` , "Bad Request");
        }
      }
    }))
  }

  ngOnDestroy(): void {
    for(let i =0; i<this.arr.length; i++) {
      this.arr[i].unsubscribe();
    }
  }

}
