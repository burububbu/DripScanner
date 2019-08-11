import { TabsPageRoutingModule } from './tabs.routes.module';
import { ComponentModule } from 'src/app/components/component.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabsPage } from './tabs.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, TabsPageRoutingModule],
  declarations: [TabsPage]
})
export class TabsPageModule {}
