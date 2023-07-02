import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {VehicleListComponent} from "./vehicle/vehicle-list/vehicle-list.component";

const routes: Routes = [
  {path:"",component:VehicleListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
