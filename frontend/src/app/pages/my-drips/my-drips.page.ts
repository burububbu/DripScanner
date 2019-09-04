import { Component } from "@angular/core";
import {
  OwnersService,
  DripDeclaration
} from "src/app/providers/owners/owners.service";
import { Router } from "@angular/router";
import { LoadingController } from "@ionic/angular";

@Component({
  selector: "app-my-drips",
  templateUrl: "./my-drips.page.html",
  styleUrls: ["./my-drips.page.scss"]
})
export class MyDripsPage {
  myDrips: DripDeclaration[];
  constructor(
    private ownersService: OwnersService,
    private router: Router,
    private loadingController: LoadingController
  ) {}

  async ionViewDidEnter() {
    await this.loadDrips();
  }

  async getDrips() {
    const drips = await this.ownersService.getDrips().toPromise();
    this.myDrips = [...drips];
  }

  handleOpenClick(e: Event) {
    this.router.navigateByUrl(`/info-drip/${e}`);
  }

  handleShareClick(e: Event) {
    this.router.navigateByUrl(`/drip-sharing/${e}`);
  }

  async handleTrashClick(e) {
    await this.ownersService.removeDripOwnership(e).toPromise();
    await this.loadDrips();
  }

  async loadDrips() {
    const res = await this.loadingController.create({
      message: "Please wait..."
    });
    await res.present();
    try {
      await this.getDrips();
    } finally {
      await res.dismiss();
    }
  }
}
