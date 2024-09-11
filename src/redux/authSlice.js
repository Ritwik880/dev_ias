import { createSlice } from "@reduxjs/toolkit";

// const loadCartFromLocalStorage = () =>{
//     try {
//         const save = localStorage.getItem('cartItems');
//         return save ? JSON.parse(save) : [];
//     } catch (error) {
//         console.error('Could not load cart from localstorage', error);
//         return [];
//     }
// }

// const saveCartToLocalStorage = (state) =>{
//     try {
//         const save = JSON.stringify(state.cartItems);
//         localStorage.setItem('cartItems', save);
//     } catch (error) {
//         console.error('Could not save cart to localstorage!', error);  
//     }
// }

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
            if (userUID) {
                localStorage.setItem(`cart_${userUID}`, JSON.stringify(state.cartItems));
            }
        },
        removeFromCart: (state, action) => {
            state.cartItems = state.cartItems.filter(item => item.id !== action.payload);
            const userUID = localStorage.getItem('userUID');
            if (userUID) {
                localStorage.setItem(`cart_${userUID}`, JSON.stringify(state.cartItems));
            }
        },
        clearCart: (state) => {
            state.cartItems = [];
            const userUID = localStorage.getItem('userUID');
            if (userUID) {
                localStorage.removeItem(`cart_${userUID}`);
            }
        },
        loadCart: (state, action) => {
            const savedCart = action.payload;
            state.cartItems = savedCart;
        }
    }
})
export const { setUser, clearUser } = authSlice.actions;

export const logIn = (user) => (dispatch) => {
    dispatch(setUser(user));
    const savedCart = JSON.parse(localStorage.getItem(`cart_${user.uid}`)) || [];
    dispatch(loadCart(savedCart));
};

export const logOut = () => (dispatch) => {
    dispatch(clearUser());
    dispatch(clearCart());
};

export const authReducer = authSlice.reducer;
export const cartReducer = cartSlice.reducer;

export const { addToCart, removeFromCart, clearCart, loadCart } = cartSlice.actions;