import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';

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

  constructor(private _CartService:CartService , private _ActivatedRoute:ActivatedRoute){}

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

  handleshippingAddress(form : FormGroup) {
    this.arr.push(this._CartService.onlinePayment(this.cartId , form.value).subscribe({
      next: (response) => {
        this.redirectToPaymentPage(response.session.url);
      },
      error: (err) => {console.log(err)}
    }));
  }

  ngOnDestroy(): void {
    for(let i =0; i<this.arr.length; i++) {
      this.arr[i].unsubscribe();
    }
  }

}
