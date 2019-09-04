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

  barcodeText: string;

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
      this.barcodeText = barcodeData.text;

      if (this.barcodeText !== "") {
        if (barcodeData.format === "QR_CODE") {
          await this.ownerService
            .moveDripOwnership(this.barcodeText)
            .toPromise();
        } else {
          await this.ownerService
            .addDripOwnership(this.barcodeText)
            .toPromise();
        }
      }
    } catch (err) {
      if (err.status === 403) {
        this.createToast(err.error.message);
      }
      if (err.status === 404) {
        this.createToast(err.error.message);
      }
    }
    this.router.navigateByUrl("/info-drip/" + this.barcodeText);
  }

  goToExample() {
    this.router.navigateByUrl("/info-drip/121as8ed54tg");
    // this.router.navigateByUrl('/info-drip/121as8eg'); // drip non trovata
    // this.ngZone.run(() => this.router.navigateByUrl("info-drip/121as8ed54tg"));
  }
}
