import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { selectCartItemCount } from '../../state/cart/cart-selector';
import { CartItem } from '../../state/cart/cart-state';

@Component({
  selector: 'app-app.layout',
  standalone: false,
  
  templateUrl: './app.layout.component.html',
  styleUrl: './app.layout.component.css'
})
export class AppLayoutComponent {

  cartTotal$;

  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store<{ cart: {items: CartItem[]} }>
  ) { 
    this.cartTotal$ = this.store.pipe(select(selectCartItemCount));
  }

  async logout(){
    await this.authService.logout();
    this.router.navigate(['auth/login']);
  }

}
