import { Injectable } from "@angular/core";
import { AuthService } from "./../auth/auth.service";
import { Observable, from } from "rxjs";
import { HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { mergeMap } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class InterceptorService {
  constructor(private readonly authService: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return from(this.authService.access_token).pipe(
      mergeMap(token => next.handle(this.addToken(req, token)))
    );
  }

  private addToken(req: HttpRequest<any>, token) {
    return req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
        "Access-Control-Allow-Origin": "http://localhost:8100",
        "Content-Type": "application/json"
      }
    });
  }
}
