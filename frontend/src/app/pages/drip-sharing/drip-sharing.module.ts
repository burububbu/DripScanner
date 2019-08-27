import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DripSharingPage } from './drip-sharing.page';
import { NgxQRCodeModule } from 'ngx-qrcode2';
import { ComponentModule } from 'src/app/components/component.module';

const routes: Routes = [
  {
    path: ':id',
    component: DripSharingPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NgxQRCodeModule,
    ComponentModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DripSharingPage]
})
export class DripSharingPageModule {}
