import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { OwnersService } from "src/app/providers/owners/owners.service";

@Component({
  selector: "app-drip-sharing",
  templateUrl: "./drip-sharing.page.html",
  styleUrls: ["./drip-sharing.page.scss"]
})
export class DripSharingPage {
  createdCode = null;
  constructor(
    private readonly route: ActivatedRoute,
    private readonly ownerService: OwnersService
  ) {
    this.createdCode = this.route.snapshot.paramMap.get("id");
  }

  async ionViewWillEnter() {
    await this.ownerService.setShareable(this.createdCode, true).toPromise();
  }

  async ionViewWillLeave() {
    try {
      await this.ownerService.setShareable(this.createdCode, false).toPromise();
    } catch (err) {
      console.log(err.error.message);
    }
  }
}
