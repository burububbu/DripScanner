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
    let barcodeData;
    try {
      barcodeData = await this.barcodeScanner.scan();
    } catch (err) {
      await this.createToast(`Can't scan the bar/QR code, error: ${err}`);
    }

    if (barcodeData.text !== "") {
      try {
        if (barcodeData.format === "QR_CODE") {
          await this.ownerService
            .moveDripOwnership(barcodeData.text)
            .toPromise();
        } else {
          await this.ownerService
            .addDripOwnership(barcodeData.text)
            .toPromise();
        }

        await this.createToast("Drip added to your drips");
      } catch (err) {
        if (err.status === 403 || err.status === 404) {
          await this.createToast(err.error.message);
        }
      } finally {
        this.router.navigateByUrl("/info-drip/" + barcodeData.text);
      }
    }
  }

  goToExample() {
    this.router.navigateByUrl("/info-drip/121as8ed54tg");
    // this.router.navigateByUrl('/info-drip/121as8eg'); // drip non trovata
    // this.ngZone.run(() => this.router.navigateByUrl("info-drip/121as8ed54tg"));
  }
}
