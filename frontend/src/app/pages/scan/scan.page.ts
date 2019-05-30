import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-scan',
  templateUrl: './scan.page.html',
  styleUrls: ['./scan.page.scss']
})
export class ScanPage implements OnInit {
  constructor(
    private barcodeScanner: BarcodeScanner,
    private toastController: ToastController,
    private router: Router
  ) {}

  ngOnInit() {}

  async createToast(errorMessage: string) {
    const toast = await this.toastController.create({
      message: errorMessage,
      duration: 2000,
      position: 'top'
    });
    toast.present();
  }

  scan() {
    this.barcodeScanner
      .scan()
      .then(barcodeData => {
        if (barcodeData.text !== '') {
          this.router.navigateByUrl('/info-drip/' + barcodeData.text);
        }
      })
      .catch(err => {
        this.createToast('Error');
        console.log('Err: ', err);
      });
  }

  goToExample() {
    this.router.navigateByUrl('/info-drip/121as8ed54tg');
  }
}
