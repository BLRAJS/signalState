import {Component, inject, Signal} from '@angular/core';
import { CartService} from "../cart.service";
import {CartItem} from "./cart";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
})
export class CartComponent {
  cartService = inject(CartService);

  cartItems:Signal<CartItem[]> = this.cartService.select('cartItems')
  subTotal = this.cartService.subTotal;
  deliveryFee = this.cartService.deliveryFee;
  tax = this.cartService.tax;
  totalPrice = this.cartService.totalPrice;

}
