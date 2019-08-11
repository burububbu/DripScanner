import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoggedGuard } from './guards/logged.guard';

const routes: Routes = [
  { path: '', redirectTo: 'tabs', pathMatch: 'full' },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  {
    path: 'tabs',
    loadChildren: './pages/tabs/tabs.module#TabsPageModule',
    canActivate: [LoggedGuard]
  },
  {
    path: 'info-drip',
    loadChildren: './pages/info-drip/info-drip.module#InfoDripPageModule',
    canActivate: [LoggedGuard]
  },
  {
    path: 'my-drips',
    loadChildren: './pages/my-drips/my-drips.module#MyDripsPageModule',
    canActivate: [LoggedGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
