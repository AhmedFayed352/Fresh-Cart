import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'titleSlice'
})
export class TitleSlicePipe implements PipeTransform {

  transform(title : string | undefined, numOfSlice: number): unknown {
    return title?.split(" ").slice(0 , numOfSlice).join(" ");
  }

}
