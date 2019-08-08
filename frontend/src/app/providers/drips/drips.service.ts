import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Drip } from "./drip";

@Injectable({
  providedIn: "root"
})
export class DripsService {
  // baseUrl = "http://localhost:3000/drips/";
  baseUrl = "https://dripscannerita.herokuapp.com/drips/";
  // baseUrl = 'http://10.0.3.254:3000/drips/';

  constructor(private httpClient: HttpClient) {}

  // add catch
  public getDrip(id: string): Observable<Drip> {
    console.log("This is the url: " + this.baseUrl);
    return this.httpClient.get(this.baseUrl + id).pipe(
      map(drip => {
        return new Drip(drip);
      })
    );
  }
}
