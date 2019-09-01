import { Component, OnInit, ViewChild, AfterViewInit } from "@angular/core";
import { LoadingController, AlertController } from "@ionic/angular";
import { ActivatedRoute, Router } from "@angular/router";
import { DripsService } from "src/app/providers/drips/drips.service";
import { Drip } from "src/app/models/drip";

import { Chart } from "chart.js";

import * as palette from "google-palette";
import { tap, catchError } from "rxjs/operators";
import { throwError } from "rxjs";
import { properties } from "./properties.enum";
import { OwnersService } from "src/app/providers/owners/owners.service";
import { AuthService } from "src/app/providers/auth/auth.service";

@Component({
  selector: "app-info-drip",
  templateUrl: "./info-drip.page.html",
  styleUrls: ["./info-drip.page.scss"]
})
export class InfoDripPage implements AfterViewInit {
  @ViewChild("barCanvas") barCanvas;
  @ViewChild("lineCanvas") lineCanvas;
  @ViewChild("doughnutCanvas") doughnutCanvas;
  doughnutChart: any;
  barChart: any;
  lineChart: any;
  currentID: string;
  hidden = true;

  infoEntries: [string, any][];
  title: string;
  constructor(
    private readonly route: ActivatedRoute,
    private readonly dripService: DripsService,
    private readonly ownerService: OwnersService,
    private readonly loadingController: LoadingController,
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly alertController: AlertController
  ) {
    this.currentID = this.route.snapshot.paramMap.get("id");
    this.title = `Info about  ${this.currentID}`; // oppure lo metto nel willEnter?
  }

  ngAfterViewInit() {
    this.loadingController.create({ message: "Please wait..." }).then(res => {
      res.present();
      this.dripService
        .getDrip(this.currentID)
        .pipe(
          tap(drip => {
            console.log(drip);
            this.infoEntries = this.getInfoEntries(drip);
            this.getCharts(drip);
            this.hidden = false;
            this.updateOwnerShip();
          }),
          catchError(err => {
            if ((err.status = 404)) {
              this.presentAlert(
                `Non è stata trovata nessuna flebo con il codice ${this.currentID}`
              );
            } else {
              this.presentAlert(err.message);
            }
            return throwError(err);
          })
        )
        .subscribe(_ => res.dismiss(), err => res.dismiss());
    });
  }

  async presentAlert(msg: string) {
    const alert = await this.alertController.create({
      header: "Errore",
      message: msg,
      buttons: [
        {
          text: "ok",
          handler: () => {
            this.router.navigateByUrl("/tabs/scan");
          }
        }
      ]
    });
    await alert.present();
  }

  private getCharts(drip: Drip) {
    this.getDoughnutChart(drip, "composizione");
    this.getBarChart(drip, "dosaggioEta");
    this.getLineChart(drip, "dosaggioPeso");
  }

  getChart(context, chartType, data, options?) {
    return new Chart(context, {
      type: chartType,
      data,
      options
    });
  }

  getData(drip: Drip, tipo: string) {
    const label1 = [];
    const data1 = [];
    drip[tipo].forEach((v, k) => {
      label1.push(k), data1.push(v);
    });
    return [label1, data1];
  }

  getColours(numbers: number): [string] {
    const arr = palette("tol-dv", numbers);
    const arr1 = arr.map(x => {
      return "#" + x;
    });
    return arr1;
  }
  getDoughnutChart(drip: Drip, tipo: string) {
    const data = {
      labels: this.getData(drip, tipo)[0],
      datasets: [
        {
          label: "ml",
          data: this.getData(drip, tipo)[1],
          backgroundColor: this.getColours(this.getData(drip, tipo)[1].length),
          borderColor: []
        }
      ]
    };
    return this.getChart(this.doughnutCanvas.nativeElement, "doughnut", data);
  }
  getBarChart(drip: Drip, tipo: string) {
    const data = {
      labels: this.getData(drip, tipo)[0],
      datasets: [
        {
          label: "ml",
          data: this.getData(drip, tipo)[1],
          backgroundColor: this.getColours(this.getData(drip, tipo)[1].length),
          borderColor: [],
          borderWidth: 1
        }
      ]
    };

    const options = {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true
            }
          }
        ]
      }
    };

    return this.getChart(this.barCanvas.nativeElement, "bar", data, options);
  }

  getLineChart(drip: Drip, tipo: string) {
    const data = {
      labels: this.getData(drip, tipo)[0],
      datasets: [
        {
          label: tipo,
          fill: false,
          borderColor: "orange",
          data: this.getData(drip, tipo)[1]
        }
      ]
    };
    return this.getChart(this.lineCanvas.nativeElement, "line", data);
  }

  private getInfoEntries(drip: Drip) {
    const entries = Object.entries(drip);
    entries.shift();
    return entries
      .filter(element => {
        if (!(element[1] instanceof Map)) {
          return element;
        }
      })
      .map(element => {
        element[0] = properties[element[0]];
        return element;
      });
  }

  goBack() {
    this.router.navigateByUrl("/tabs");
  }
  share() {
    this.router.navigateByUrl(`/drip-sharing/${this.currentID}`);
  }
  isHidden() {
    return this.hidden;
  }
  updateOwnerShip() {
    this.ownerService
      .addDripOwnership(this.authService.profile.name, this.currentID)
      .subscribe();
  }
}
