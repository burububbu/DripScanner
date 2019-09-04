import { Component, OnInit } from "@angular/core";
import { BarcodeScanner } from "@ionic-native/barcode-scanner/ngx";
import { ToastController } from "@ionic/angular";
import { Router } from "@angular/router";
import { OwnersService } from "src/app/providers/owners/owners.service";

@Component({
  selector: "app-scan",
  templateUrl: "./scan.page.html",
  styleUrls: ["./scan.page.scss"]
})
export class ScanPage {
  constructor(
    private barcodeScanner: BarcodeScanner,
    private toastController: ToastController,
    private ownerService: OwnersService,
    private router: Router
  ) {}

  async createToast(errorMessage: string) {
    const toast = await this.toastController.create({
      message: errorMessage,
      duration: 2000,
      position: "top"
    });
    toast.present();
  }

  async scan() {
    try {
      const barcodeData = await this.barcodeScanner.scan();
      if (barcodeData.text !== "") {
        if (barcodeData.format === "QR_CODE") {
          await this.ownerService
            .moveDripOwnership(barcodeData.text)
            .toPromise();
        } else {
          await this.ownerService
            .addDripOwnership(barcodeData.text)
            .toPromise();
        }
        this.router.navigateByUrl("/info-drip/" + barcodeData.text);
      }
    } catch (err) {
      this.createToast("Error");
      console.log("Err: ", err);
    }
  }

  goToExample() {
    this.router.navigateByUrl("/info-drip/121as8ed54tg");
    // this.router.navigateByUrl('/info-drip/121as8eg'); // drip non trovata
    // this.ngZone.run(() => this.router.navigateByUrl("info-drip/121as8ed54tg"));
  }
}
