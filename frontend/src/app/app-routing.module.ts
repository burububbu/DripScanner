import { NgModule } from "@angular/core";
import { RouterModule, Routes, PreloadAllModules } from "@angular/router";
import { LoggedGuard } from "./guards/logged.guard";
import { NotLoggedGuard } from "./guards/not-logged.guard";

const routes: Routes = [
  { path: "", redirectTo: "login", pathMatch: "full" },
  {
    path: "login",
    loadChildren: "./pages/login/login.module#LoginPageModule",
    canActivate: [NotLoggedGuard]
  },
  {
    path: "tabs",
    loadChildren: "./pages/tabs/tabs.module#TabsPageModule",
    canActivate: [LoggedGuard]
  },
  {
    path: "info-drip",
    loadChildren: "./pages/info-drip/info-drip.module#InfoDripPageModule",
    canActivate: [LoggedGuard]
  },
  {
    path: "my-drips",
    loadChildren: "./pages/my-drips/my-drips.module#MyDripsPageModule",
    canActivate: [LoggedGuard]
  },
  {
    path: "drip-sharing",
    loadChildren:
      "./pages/drip-sharing/drip-sharing.module#DripSharingPageModule",
    canActivate: [LoggedGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
