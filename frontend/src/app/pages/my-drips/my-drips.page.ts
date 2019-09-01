import { Component, OnInit } from "@angular/core";
import { OwnersService } from "src/app/providers/owners/owners.service";
import { tap } from "rxjs/operators";
import { Router } from "@angular/router";
import { LoadingController } from "@ionic/angular";
import { AuthService } from "src/app/providers/auth/auth.service";

@Component({
  selector: "app-my-drips",
  templateUrl: "./my-drips.page.html",
  styleUrls: ["./my-drips.page.scss"]
})
export class MyDripsPage implements OnInit {
  myDrips: string[];
  constructor(
    private ownersService: OwnersService,
    private router: Router,
    private loadingController: LoadingController,
    private authService: AuthService
  ) {}

  ngOnInit() {}

  ionViewDidEnter() {
    this.loadingController.create({ message: "Please wait..." }).then(res => {
      res.present();
      this.getDrips();
      res.dismiss();
    });
  }

  getDrips() {
    this.ownersService
      .getDrips(this.authService.profile.name)
      .pipe(tap((drips: string[]) => (this.myDrips = drips)))
      .subscribe(() => console.log(this.myDrips));
  }

  handleOpenClick(e: Event) {
    this.router.navigateByUrl(`/info-drip/${e}`);
  }

  handleShareClick(e: Event) {
    this.router.navigateByUrl(`/drip-sharing/${e}`);
  }
}
