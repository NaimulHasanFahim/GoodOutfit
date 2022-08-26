import { createSlice } from "@reduxjs/toolkit";


const orderSlice = createSlice({
    name:"order",
    initialState:{
        products:[],
        quantity: 0,
        total: 0
    },
    reducers : {
        placeOrder : (state, action)=>{
            state.quantity +=1;
            state.products.push(action.payload);
            state.total += action.payload.price*action.payload.quantity;
        },
        editOrder : (state, action)=>{

        },
        deleteOrder : (state) =>{
            state.products = [];
            state.quantity = 0;
            state.total = 0;
        }
    },
});

export const {addProduct, clearCart} = orderSlice.actions;
export default orderSlice.reducer;