import { createSlice } from "@reduxjs/toolkit";


const cartSlice = createSlice({
    name:"cart",
    initialState:{
        products:[],
        quantity: 0,
        total: 0
    },
    reducers : {
        addProduct : (state, action)=>{
            state.quantity +=1;
            state.products.push(action.payload);
            state.total += action.payload.price*action.payload.quantity;
        },
        clearCart : (state) =>{
            // console.log(state.products);
            state.products = [];
            state.quantity = 0;
            state.total = 0;
        },
        decreaseCartItemById : (state, action) =>{
            state.products = action.payload;
        },
        increaseCartItemById : (state, action) =>{
            state.products = action.payload;
            window.location.reload();
        },
        
    },
});

export const {addProduct, clearCart, increaseCartItemById, decreaseCartItemById} = cartSlice.actions;
export default cartSlice.reducer;