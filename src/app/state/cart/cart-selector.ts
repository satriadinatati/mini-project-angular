import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CartState } from "./cart-state";
import { state } from "@angular/animations";

export const selectCartState = createFeatureSelector<CartState>('cart');

export const selectCartItems = createSelector(
    selectCartState, (state) => state.items
)

export const selectCartItemCount = createSelector(
    selectCartState, (state) => {
        let count = 0;
        state.items.forEach(item => count += item.quantity);
        return count;
    }
)