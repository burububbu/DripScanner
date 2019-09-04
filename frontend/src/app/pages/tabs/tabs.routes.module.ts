import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TabsPage } from "./tabs.page";

const routes: Routes = [
  {
    path: "",
    component: TabsPage,
    children: [
      {
        path: "scan",
        children: [
          {
            path: "",
            loadChildren: "../scan/scan.module#ScanPageModule"
          }
        ]
      },
      {
        path: "my-drips",
        children: [
          {
            path: "",
            loadChildren: "../my-drips/my-drips.module#MyDripsPageModule"
          }
        ]
      },
      {
        path: "",
        redirectTo: "scan",
        pathMatch: "full"
      }
    ]
  },
  {
    path: "",
    redirectTo: "scan",
    pathMatch: "full"
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
