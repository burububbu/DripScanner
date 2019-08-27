import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { DripsService } from 'src/app/providers/drips/drips.service';
import { AuthService } from 'src/app/providers/auth/auth.service';

@Component({
  selector: 'app-scan',
  templateUrl: './scan.page.html',
  styleUrls: ['./scan.page.scss']
})
export class ScanPage implements OnInit {
  constructor(
    private barcodeScanner: BarcodeScanner,
    private toastController: ToastController,
    private dripService: DripsService,
    private authService: AuthService,
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
    // this.router.navigateByUrl('/info-drip/121as8eg'); drip non trovata
  }
}
