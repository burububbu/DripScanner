import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment.prod";
import { Observable } from "rxjs";
import { DripDeclaration } from "src/app/models/drip-declaration";

@Injectable({
  providedIn: "root"
})
export class OwnersService {
  constructor(private readonly httpClient: HttpClient) {}

  public getDrips(): Observable<DripDeclaration[]> {
    return this.httpClient.get(environment.BACKEND_OWNERS) as Observable<
      DripDeclaration[]
    >;
  }

  public addDripOwnership(code: string) {
    return this.httpClient.put(
      environment.BACKEND_OWNERS + "addDrip/" + code,
      {}
    );
  }

  public removeDripOwnership(code: string) {
    return this.httpClient.put(
      environment.BACKEND_OWNERS + "removeDrip/" + code,
      {}
    );
  }

  public moveDripOwnership(code: string) {
    return this.httpClient.put(
      environment.BACKEND_OWNERS + "moveDrip/" + code,
      {}
    );
  }

  public setShareable(code: string, state: boolean, timeoutSeconds?: number) {
    return this.httpClient.put(
      `${environment.BACKEND_OWNERS}setShareable/${code}/${state}?timeoutSeconds=${timeoutSeconds ? timeoutSeconds : ""}`,
      {}
    );
  }
}
