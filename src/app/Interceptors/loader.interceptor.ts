import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { finalize, Observable } from 'rxjs';
import { LoaderService } from '../services/loader.service';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {

  constructor(private loader: LoaderService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let clonedRequest = request.clone();
    if (clonedRequest.url.includes("cart") || clonedRequest.url.includes("wishlist")) {
      if (clonedRequest.method != "GET") {
        
      } else {
        this.loader.showLoader();
        return next.handle(clonedRequest).pipe(
          finalize(
            () => this.loader.hideLoader()
          )
        );
      }
    } else {
      this.loader.showLoader();
        return next.handle(clonedRequest).pipe(
          finalize(
            () => this.loader.hideLoader()
          )
        );
    }

    return next.handle(request);
  }
}
