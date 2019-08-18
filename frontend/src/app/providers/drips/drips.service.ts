import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { Drip } from './drip';
import { identifierModuleUrl } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class DripsService {
  // baseUrl = 'http://localhost:3000/drips/';
  baseUrl = 'http://192.168.1.103:3000/drips/';

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

  public setOwner(id: string, ownerName: string) {
    return this.httpClient.put(this.baseUrl + id, { name: ownerName }).pipe(
      tap(
        () => console.log('OWNER NAME UPDATED' + ownerName),
        catchError(err => {
          return throwError(err);
        })
      )
    );
  }
}
