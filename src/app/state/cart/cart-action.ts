import { createAction, props } from '@ngrx/store';

export const addToCart = createAction(
    '[Cart] Add to cart',
    props<{pokemon: any, quantity: number}>()
);

export const removeFromCart = createAction(
    '[Cart] Remove from cart',
    props<{pokemonName: string}>()
);

export const updateQuantity = createAction(
    '[Cart] Update quantity',
    props<{pokemon: any, quantity: number}>()
);

export const clearCart = createAction('[Cart] Clear cart');