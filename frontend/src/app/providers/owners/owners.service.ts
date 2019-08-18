import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, catchError, map } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class OwnersService {
  constructor(private readonly httpClient: HttpClient) {}

  baseUrl = 'http://192.168.1.103:3000/owners/';

  public getDrips(username: string) {
    return this.httpClient.get(this.baseUrl + username);
  }

  public addDripOwnership(ownerName: string, code: string) {
    return this.httpClient
      .put(this.baseUrl + 'addDrip/' + ownerName, { code: code })
      .pipe(
        tap(
          () =>
            console.log('Added ' + code + ' drip ownership to ' + ownerName),
          catchError(err => {
            return throwError(err);
          })
        )
      );
  }

  public removeDripOwnership(ownerName: string, code: string) {
    return this.httpClient
      .put(this.baseUrl + 'removeDrip/' + ownerName, { code: code })
      .pipe(
        tap(
          () =>
            console.log('Removed ' + code + ' drip ownership to ' + ownerName),
          catchError(err => {
            return throwError(err);
          })
        )
      );
  }
}
