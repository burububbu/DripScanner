import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { IonicModule, AlertController } from '@ionic/angular';
import { InfoCardComponent } from './info-card/info-card.component';
import { DripsListComponent } from './drips-list/drips-list.component';

@NgModule({
  declarations: [HeaderComponent, InfoCardComponent, DripsListComponent],
  imports: [CommonModule, IonicModule],
  exports: [HeaderComponent, InfoCardComponent, DripsListComponent],

  providers: [AlertController]
})
export class ComponentModule {}
