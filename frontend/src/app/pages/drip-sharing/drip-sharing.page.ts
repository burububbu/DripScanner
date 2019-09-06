import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
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
    await this.ownerService
      .setShareable(this.createdCode, true, 5 * 60)
      .toPromise();
    // this.timeLeft = 5 * 60;
    // this.timeout = setInterval(() => {
    //   this.timeLeft--;
    //   if (this.timeLeft >= 0) {
    //     this.location.back();
    //   }
    // }, 1_000);
  }

  async ionViewWillLeave() {
    try {
      // clearInterval(this.timeout);
      await this.ownerService.setShareable(this.createdCode, false).toPromise();
    } catch (err) {
      console.log(err.error.message);
    }
  }
}
