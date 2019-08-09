import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { InfoDripPage } from './info-drip.page';
import { DripsService } from 'src/app/providers/drips/drips.service';
import { ComponentModule } from 'src/app/components/component.module';

const routes: Routes = [
  {
    path: ':id',
    component: InfoDripPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    ComponentModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [InfoDripPage],
  providers: [DripsService]
})
export class InfoDripPageModule {}
