import { createSlice } from "@reduxjs/toolkit";

const loadCartFromLocalStorage = () =>{
    try {
        const save = localStorage.getItem('cartItems');
        return save ? JSON.parse(save) : [];
    } catch (error) {
        console.error('Could not load cart from localstorage', error);
        return [];
    }
}

const saveCartToLocalStorage = (state) =>{
    try {
        const save = JSON.stringify(state.cartItems);
        localStorage.setItem('cartItems', save);
    } catch (error) {
        console.error('Could not save cart to localstorage!', error);  
    }
}

const initialState = {
    user: null,
    cartItems: loadCartFromLocalStorage(),
    isLoggedIn: false
}


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action) =>{
            state.user = action.payload;
            state.isLoggedIn = true;
        },
        clearUser: (state) =>{
            state.user = null;
            state.isLoggedIn = false;
            // localStorage.removeItem('cartItems');
        }
    }

})

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) =>{
            state.cartItems.push(action.payload)
            saveCartToLocalStorage(state);
        },
        removeFromCart: (state, action) =>{
            state.cartItems = state.cartItems.filter(item => item.id !== action.payload);
            saveCartToLocalStorage(state);
        },
        clearCart: (state) =>{
            state.cartItems = [];
            saveCartToLocalStorage(state);
        }
    }
})

export const authReducer = authSlice.reducer;
export const cartReducer = cartSlice.reducer;

export const {setUser, clearUser} = authSlice.actions;
export const {addToCart, removeFromCart, clearCart} = cartSlice.actions;