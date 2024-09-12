import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    cartItems: JSON.parse(localStorage.getItem('cartItems')) || [],
    isLoggedIn: false
}


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
            state.isLoggedIn = true;
            localStorage.setItem('userUID', action.payload.uid);
        },
        clearUser: (state) => {
            state.user = null;
            state.isLoggedIn = false;
            localStorage.removeItem('userUID');
        }
    }

})

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            state.cartItems.push(action.payload)
            const userUID = localStorage.getItem('userUID');
            console.log('I am from addtocart');
            console.log(state);
            
            if (userUID) {
                localStorage.setItem(`cart_${userUID}`, JSON.stringify(state.cartItems));
            }
        },
        removeFromCart: (state, action) => {
            state.cartItems = state.cartItems.filter(item => item.id !== action.payload);
            const userUID = localStorage.getItem('userUID');
            console.log('I am from removeFromCart');
            console.log(state);
            
            if (userUID) {
                localStorage.setItem(`cart_${userUID}`, JSON.stringify(state.cartItems));
            }
        },
        clearCart: (state) => {
            state.cartItems = [];
            const userUID = localStorage.getItem('userUID');
            console.log('I am from clearCart');
            console.log(state);
            
            if (userUID) {
                localStorage.removeItem(`cart_${userUID}`);
            }
        },
        loadCart: (state, action) => {
            console.log('I am from loadCart');
            console.log(state);
            const savedCart = action.payload;
            state.cartItems = savedCart;
        }
    }
})
export const { setUser, clearUser } = authSlice.actions;

export const logIn = (userData) => (dispatch) => {
    dispatch(setUser(userData));
    const savedCart = JSON.parse(localStorage.getItem(`cart_${userData.uid}`)) || [];
    dispatch(loadCart(savedCart));
};

export const logOut = () => (dispatch) => {
    dispatch(clearUser());
    dispatch(clearCart());
};

export const authReducer = authSlice.reducer;
export const cartReducer = cartSlice.reducer;

export const { addToCart, removeFromCart, clearCart, loadCart } = cartSlice.actions;