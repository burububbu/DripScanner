import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { tap, catchError, map } from "rxjs/operators";
import { throwError, Observable } from "rxjs";
import { environment } from "src/environments/environment.prod";
@Injectable({
  providedIn: "root"
})
export class OwnersService {
  constructor(private readonly httpClient: HttpClient) {}

  public getDrips(username: string) {
    return this.httpClient.get(environment.BACKEND_OWNERS + username);
  }

  public addDripOwnership(ownerName: string, code: string) {
    return this.httpClient
      .put(environment.BACKEND_OWNERS + "addDrip/" + ownerName, { code: code })
      .pipe(
        tap(
          () =>
            console.log("Added " + code + " drip ownership to " + ownerName),
          catchError(err => {
            return throwError(err);
          })
        )
      );
  }

  public removeDripOwnership(ownerName: string, code: string) {
    return this.httpClient
      .put(environment.BACKEND_OWNERS + "removeDrip/" + ownerName, {
        code: code
      })
      .pipe(
        tap(
          () =>
            console.log("Removed " + code + " drip ownership to " + ownerName),
          catchError(err => {
            return throwError(err);
          })
        )
      );
  }
}
