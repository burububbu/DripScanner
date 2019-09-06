import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Drip } from "../../models/drip";
import { environment } from "src/environments/environment.prod";

@Injectable({
  providedIn: "root"
})
export class DripsService {
  constructor(private httpClient: HttpClient) {}

  public getDrip(id: string): Observable<Drip> {
    return this.httpClient.get(environment.BACKEND_DRIPS + id).pipe(
      map(drip => {
        return new Drip(drip);
      })
    );
  }
}
