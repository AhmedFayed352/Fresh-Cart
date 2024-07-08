import { IProduct } from './../interfaces/iproduct';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(productList: IProduct[] , searchTerm: string): IProduct[] {
    return productList.filter((product) => product.title.toLowerCase().includes(searchTerm.toLowerCase()));
  }

}
