import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {inject, Injectable, signal} from '@angular/core';
import {catchError, map} from 'rxjs';
import {of} from 'rxjs';
import {VehicleResponse, Vehicle, Data, VehicleState} from './vehicle/vehicle';
import {SignalState} from "../../projects/signal-state/src/lib/signal-state.service";

@Injectable({
  providedIn: 'root',
})
export class VehicleStateService extends SignalState<VehicleState> {

  private url = 'https://swapi.py4e.com/api/vehicles';
  http = inject(HttpClient);

  constructor() {
    super({
      vehicles: signal<Data<Vehicle[]>>({ data: [] } as Data<Vehicle[]>),
      selectedVehicle: null,
    },true,20);
  }

  // track VehicleStateService state changes
  historyChanges = this.addEffect((state:VehicleState) => console.log('VehicleStateService State changed:', this.getStateHistory()));


  private vehicles$ = this.http.get<VehicleResponse>(this.url).pipe(
    map((data:VehicleResponse) =>
      data.results.map((v:Vehicle) => ({...v, cost_in_credits: isNaN(Number(v.cost_in_credits))
            ? String(Math.random() * 100000) : v.cost_in_credits})
      )),
    map((arr) => ({data: arr} as Data<Vehicle[]>)),
    catchError((e) => of({data: [], error: this.formatError(e)} as Data<Vehicle[]>))
  );

  private signalVehicles = this.updateState((state: VehicleState) => ({
        ...state,
        vehicles: this.toSignalFromObservable(this.vehicles$, { data: [] } as Data<Vehicle[]>)
   }));

  public onSelected(vehicleName: string): void {
    this.setState({
      ...this.getState().data,
      selectedVehicle: this.getState().data.vehicles()?.data.find((v:Vehicle|null) => v?.name === vehicleName) || null
    });
  }

  private formatError(err: HttpErrorResponse): string {
    return err.error instanceof ErrorEvent
      ? `An error occurred: ${err.error.message}`
      : `Server returned code: ${err.status}, error message is: ${err.message}`;
  }

  loading(){
    console.log(this.getState().loading)
    return this.getState().loading;
  }

}
