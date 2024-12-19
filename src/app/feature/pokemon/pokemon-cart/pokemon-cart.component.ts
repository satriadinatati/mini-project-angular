import { Component } from '@angular/core';
import { CartItem } from '../../../state/cart/cart-state';
import { select, Store } from '@ngrx/store';
import { selectCartItemCount, selectCartItems } from '../../../state/cart/cart-selector';
import { clearCart, removeFromCart } from '../../../state/cart/cart-action';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pokemon-cart',
  standalone: false,
  
  templateUrl: './pokemon-cart.component.html',
  styleUrl: './pokemon-cart.component.css'
})
export class PokemonCartComponent {
  cart$;
  totalItem$;

  constructor(
    private store: Store<{ cart: {items: CartItem[]} }>,
    private router: Router
  ) {
    this.cart$ = this.store.pipe(select(selectCartItems));
    this.totalItem$ = this.store.pipe(select(selectCartItemCount));
  }

  removeItem(pokemonName: string) {
    this.store.dispatch(removeFromCart({pokemonName}));
  }

  goToCheckout() {
    this.router.navigate(['/cart/checkout']);
  }

  cleanCart(){
    this.store.dispatch(clearCart());
  }
}
