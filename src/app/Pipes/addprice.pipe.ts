import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'addprice'
})
export class AddpricePipe implements PipeTransform {

  transform(price: number | undefined): unknown {
    return `${price} EGP`;
  }

}
