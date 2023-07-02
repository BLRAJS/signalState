import {Injectable, Signal} from '@angular/core';
import {Vehicle} from "./vehicle/vehicle";
import {CartItem, CartState} from "./cart/cart";
import {State} from "../../dist/signal-state/lib/model";
import {SignalState} from "signal-state";

@Injectable({
  providedIn: 'root'
})

export class CartService extends SignalState<CartState> {
  constructor() {
    super(
      {
        cartItems: []
      },true,20,localStorage, 'cart-service')

    // in case you want to sync your cart state with session storage
    this.addEffect(() => this.saveState());
  }

  // Total up the extended price for each item
  get subTotal(): Signal<number> {
    return this.compute((state: State<CartState>) =>
      this.getState().data.cartItems.reduce(
        (a: number, b: CartItem) => a + b.quantity * Number(b.vehicle.cost_in_credits),
        0
      )
    );
  }

  // Delivery is free if spending more than 100,000 credits
  get deliveryFee(): Signal<number> {
    return this.compute(() => (this.subTotal() < 100000 ? 999 : 0));
  }

  // Tax could be based on shipping address zip code
  get tax(): Signal<number> {
    return this.compute(() => Math.round(this.subTotal() * 10.75) / 100);
  }

  // Total price
  get totalPrice(): Signal<number> {
    return this.compute(() => this.subTotal() + this.deliveryFee() + this.tax());
  }

  addToCart(vehicle: Vehicle): void {
    this.updateState((state: CartState) => {
      const existingCartItem = state.cartItems.find(item => item.vehicle.name === vehicle.name);

      const updatedCartItems = existingCartItem
        ? this.updateCartItem(state.cartItems, vehicle, 1)
        : this.addNewItem(state.cartItems, vehicle, 1);

      return {...state, cartItems: updatedCartItems};
    });
  }

  private updateCartItem(cartItems: CartItem[], vehicle: Vehicle, quantity: number): CartItem[] {
    return cartItems.map(item =>
      item.vehicle.name === vehicle.name
        ? {...item, quantity: item.quantity + quantity}
        : item
    );
  }

  private addNewItem(cartItems: CartItem[], vehicle: Vehicle, quantity: number): CartItem[] {
    return [...cartItems, {vehicle, quantity}];
  }

  removeFromCart(cartItem: CartItem): void {
    this.updateState((state: CartState) => ({
      ...state,
      cartItems: state.cartItems.filter((i: CartItem) => i.vehicle.name !== cartItem.vehicle.name),
    }));
  }

  updateInCart(cartItem: CartItem, quantity: number): void  {
    this.updateState((state: CartState) => ({
      ...state,
      cartItems: state.cartItems.map((item: CartItem) =>
        item.vehicle.name === cartItem.vehicle.name
          ? {vehicle: cartItem.vehicle, quantity}
          : item
      ),
    }));
  }

  goBack(){
    this.rollbackState();
  }
}
