import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'titleSlice'
})
export class TitleSlicePipe implements PipeTransform {

  transform(title : string , numOfSlice: number): unknown {
    return title.split(" ").slice(0 , numOfSlice).join(" ");
  }

}
