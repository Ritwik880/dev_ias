import { createSlice } from "@reduxjs/toolkit";
import { getDatabase, ref, set, get } from "firebase/database";
import { app } from '../firebase';

const db = getDatabase(app);

const initialState = {
    user: null,
    cartItems: [],
    isLoggedIn: false
}

//redux auth slice
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

//redux cart slice
const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            state.cartItems.push(action.payload);
        },
        removeFromCart: (state, action) => {
            state.cartItems = state.cartItems.filter(item => item.id !== action.payload);
        },
        clearCart: (state) => {
            state.cartItems = [];
        },
        loadCart: (state, action) => {
            state.cartItems = action.payload;
        }
    }
});

export const fetchCartFromRTDB = (uid) => async (dispatch) => {
    const cartRef = ref(db, `users/${uid}/cart`);
    const cartSnapshot = await get(cartRef);
    if (cartSnapshot.exists()) {
        dispatch(loadCart(cartSnapshot.val()));
    } else {
        await set(cartRef, []);
        dispatch(loadCart([]));
    }
};
// add to cart logic
export const addToCartAndSync = (uid, item) => async (dispatch) => {
    const cartRef = ref(db, `users/${uid}/cart`);
    dispatch(addToCart(item));
    const currentCart = await get(cartRef);
    const updatedCart = currentCart.exists() ? [...currentCart.val(), item] : [item];
    await set(cartRef, updatedCart);
};

// remove cart data logic
export const removeFromCartAndSync = (uid, itemId) => async (dispatch) => {
    const cartRef = ref(db, `users/${uid}/cart`);
    const currentCart = await get(cartRef);
    if (currentCart.exists()) {
        const updatedCart = currentCart.val().filter(item => item.id !== itemId);
        await set(cartRef, updatedCart);
        dispatch(removeFromCart(itemId));
    }
};

// clear cart data logic
export const clearCartAndSync = (uid) => async (dispatch) => {
    const cartRef = ref(db, `users/${uid}/cart`);
    await set(cartRef, []);
    dispatch(clearCart());
};


export const { setUser, clearUser } = authSlice.actions;

export const logIn = (userData) => async (dispatch) => {
    dispatch(setUser(userData));
    await dispatch(fetchCartFromRTDB(userData.uid));
};

export const logOut = () => (dispatch) => {
    dispatch(clearUser());
    dispatch(clearCart());
};

export const authReducer = authSlice.reducer;
export const cartReducer = cartSlice.reducer;

export const { addToCart, removeFromCart, clearCart, loadCart } = cartSlice.actions;