import { createSlice } from "@reduxjs/toolkit";
import { getDatabase, ref, set, get } from "firebase/database";
import { app } from '../firebase';

const db = getDatabase(app);

const initialState = {
    user: null,
    cartItems: [],
    isLoggedIn: false
}

// Redux auth slice
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
            state.isLoggedIn = true;
        },
        clearUser: (state) => {
            state.user = null;
            state.isLoggedIn = false;
        }
    }
});

// Redux cart slice
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
            state.cartItems = Array.isArray(action.payload) ? action.payload : [];
        }
    }
});

// Async operations

// Fetch the user's cart from Firebase
export const fetchCartFromRTDB = (userUID) => async (dispatch) => {
    const cartRef = ref(db, `carts/${userUID}`);
    try {
        const snapshot = await get(cartRef);
        if (snapshot.exists()) {
            const cartItems = snapshot.val(); // Get the cart from Firebase
            dispatch(loadCart(cartItems));
        } else {
            dispatch(loadCart([])); // Load an empty cart if nothing is found
        }
    } catch (error) {
        console.error('Error fetching cart from Firebase:', error);
    }
};

// Add item to cart and sync with Firebase
export const addToCartAndSync = (uid, item) => async (dispatch) => {
    try {
        const cartRef = ref(db, `users/${uid}/cart`);
        const currentCart = await get(cartRef);
        const updatedCart = currentCart.exists() ? [...currentCart.val(), item] : [item];
        await set(cartRef, updatedCart);
        dispatch(addToCart(item)); // Update local state
    } catch (error) {
        console.error('Error adding to cart in Firebase:', error);
    }
};

// Remove item from cart and sync with Firebase
export const removeFromCartAndSync = (uid, itemId) => async (dispatch) => {
    try {
        const cartRef = ref(db, `users/${uid}/cart`);
        const currentCart = await get(cartRef);
        if (currentCart.exists()) {
            const updatedCart = currentCart.val().filter(item => item.id !== itemId);
            await set(cartRef, updatedCart);
            dispatch(removeFromCart(itemId)); // Update local state
        }
    } catch (error) {
        console.error('Error removing from cart in Firebase:', error);
    }
};

// Clear the user's cart in both local state and Firebase
export const clearCartAndSync = (uid) => async (dispatch) => {
    try {
        const cartRef = ref(db, `users/${uid}/cart`);
        await set(cartRef, []); // Clear cart in Firebase
        dispatch(clearCart()); // Clear local state
    } catch (error) {
        console.error('Error clearing cart in Firebase:', error);
    }
};

// Handle login and fetch cart from Firebase
export const logIn = (userData) => async (dispatch) => {
    dispatch(setUser(userData));
    await dispatch(fetchCartFromRTDB(userData.uid)); // Fetch and load cart items for the user
};

// Handle logout and clear the cart
export const logOut = () => (dispatch) => {
    dispatch(clearUser());
    dispatch(clearCart());
};

// Reducers
export const authReducer = authSlice.reducer;
export const cartReducer = cartSlice.reducer;

// Cart actions
export const { addToCart, removeFromCart, clearCart, loadCart } = cartSlice.actions;
export const { setUser, clearUser } = authSlice.actions;
