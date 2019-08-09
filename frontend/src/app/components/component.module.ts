import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { IonicModule, AlertController } from '@ionic/angular';
import { InfoCardComponent } from './info-card/info-card.component';

@NgModule({
  declarations: [HeaderComponent, InfoCardComponent],
  imports: [CommonModule, IonicModule],
  exports: [HeaderComponent, InfoCardComponent],

  providers: [AlertController]
})
export class ComponentModule {}
