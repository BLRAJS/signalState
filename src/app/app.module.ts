import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FormsModule} from "@angular/forms";
import {VehicleListComponent} from './vehicle/vehicle-list/vehicle-list.component';
import {HttpClientModule} from "@angular/common/http";
import {CartComponent} from './cart/cart.component';
import {VehicleDetailComponent} from './vehicle/vehicle-detail/vehicle-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    VehicleListComponent,
    CartComponent,
    VehicleDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
