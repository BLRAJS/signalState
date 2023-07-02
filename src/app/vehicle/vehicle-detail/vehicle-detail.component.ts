import {Component, inject, Signal} from '@angular/core';
import {VehicleStateService} from "../../vehicle.service";
import {Vehicle} from "../vehicle";
import {CartService} from "../../cart.service";

@Component({
  selector: 'app-vehicle-detail',
  templateUrl: './vehicle-detail.component.html'
})
export class VehicleDetailComponent {

  vehicleStateService = inject(VehicleStateService);
  cartService = inject(CartService);

  vehicles:Signal<Vehicle | null> = this.vehicleStateService.select('selectedVehicle')

}
