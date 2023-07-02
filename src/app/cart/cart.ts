import {Vehicle} from "../vehicle/vehicle";

export interface CartState {
  cartItems: CartItem[];
}

export interface CartItem {
  vehicle: Vehicle;
  quantity: number;
}
