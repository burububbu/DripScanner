import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/providers/auth/auth.service";
import { FingerprintAIO } from "@ionic-native/fingerprint-aio/ngx";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"]
})
export class LoginPage implements OnInit {
  constructor(private authService: AuthService, private faio: FingerprintAIO) {}
  ngOnInit() {}
  /**
   * allows you to login
   */
  login() {
    this.authService.login();
  }

  // fingerprintLogin() {
  //   this.faio
  //     .show({
  //       clientId: "Fingerprint-Demo",
  //       clientSecret: "password"
  //     })
  //     .then(result => {
  //       this.authService.login();
  //     })
  //     .catch(err => {
  //       console.log("Err: ", err);
  //     });
  // }
}
