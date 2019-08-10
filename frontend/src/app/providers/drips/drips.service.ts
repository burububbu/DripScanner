import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Drip } from './drip';

@Injectable({
  providedIn: 'root'
})
export class DripsService {
  baseUrl = 'http://localhost:3000/drips/';

  constructor(private httpClient: HttpClient) {}

  public getDrip(id: string): Observable<Drip> {
    return this.httpClient.get(this.baseUrl + id).pipe(
      map(
        drip => {
          return new Drip(drip);
        },
        catchError(err => {
          return throwError(err);
        })
      )
    );
  }
}
