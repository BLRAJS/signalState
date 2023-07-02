import {Component, inject, Signal} from '@angular/core';
import {Data, Vehicle, VehicleState} from "../vehicle";
import {VehicleStateService} from "../../vehicle.service";

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html'
})
export class VehicleListComponent {

  vehicleStateService = inject(VehicleStateService);

  selectedVehicle:Signal<Vehicle | null> = this.vehicleStateService.select('selectedVehicle')
  vehicles:  Signal<Data<Vehicle[]> | null | undefined> = this.vehicleStateService.select('vehicles')();

  // or you can use selectMany
  // vehicleData: Signal<Pick<VehicleState, 'selectedVehicle' | 'vehicles'>> = this.vehicleStateService.selectMany('selectedVehicle', 'vehicles');


}
