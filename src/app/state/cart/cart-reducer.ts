import { createReducer, on } from "@ngrx/store";
import { CartState, initialCartState } from "./cart-state";
import { addToCart, clearCart, removeFromCart, updateQuantity } from "./cart-action";

const loadInitialState = (): CartState => {
    if(typeof sessionStorage !== 'undefined'){
        const storedState = sessionStorage.getItem('cart');
        return storedState ? JSON.parse(storedState) : initialCartState;
    }
    return initialCartState;
}

const saveToSessionStorage = (state: CartState) => {
    if(typeof sessionStorage !== 'undefined'){
        sessionStorage.setItem('cart', JSON.stringify(state));
    }
}

export const cartReducer = createReducer(
    loadInitialState(),
    on(addToCart, (state, {pokemon, quantity}) => {
        // Cari item di dalam keranjang
        const existingItemIndex = state.items.findIndex(
            (item) => item.pokemon.name === pokemon.name
        );
    
        // Buat salinan array items dari state
        let newItems = [...state.items];
    
        if(existingItemIndex > -1) {
            // Buat item baru dengan properti quantity yang diperbarui
            const updatedItem = {
                ...newItems[existingItemIndex], 
                quantity: newItems[existingItemIndex].quantity + quantity
            };
    
            // Gantikan item pada posisi existingItemIndex dengan updatedItem
            newItems[existingItemIndex] = updatedItem;
        } else {
            // Tambahkan item baru ke array dengan spread pokemon dan quantity
            newItems = [...newItems, { pokemon, quantity }];
        }
    
        // Buat state baru dengan array items yang diperbarui
        const newState = {
            ...state,
            items: newItems
        };
    
        // Simpan ke sessionStorage
        saveToSessionStorage(newState);
        
        console.log("newState", newState);
        
        return newState;
    }),    
    on(removeFromCart, (state, {pokemonName})=>{
        let newItems = state.items.filter((item) => item.pokemon.name !== pokemonName);
        let newState = {items: newItems};
        saveToSessionStorage(newState);
        return newState;
    }),
    on(clearCart, () => {
        saveToSessionStorage(initialCartState);
        return initialCartState;
    })
);