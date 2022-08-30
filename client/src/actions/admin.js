import * as api from '../api/index';
import { logout } from '../redux/userRedux';
import { fetchingFailure, ordersDetailsfetchingSuccess, productDetailsfetchingSuccess, startFetching, usersDetailsfetchingSuccess, widgetfetchingSuccess } from './../redux/adminRedux';

export const getWidgetData = (userData, setWidget) => async (dispatch)=>{
    
    dispatch(startFetching());
    try {
        const { data } = await api.getWidgetData(userData);
        setWidget(data);
        dispatch(widgetfetchingSuccess(data));
    } catch (error) {
        dispatch(fetchingFailure());
        console.log(error);
    }
}

export const getProductsData = (userData, setProducts) => async (dispatch)=>{
    dispatch(startFetching());
    try {
        const { data } = await api.getProductsData(userData);
        setProducts(data); 
        dispatch(productDetailsfetchingSuccess(data));
    } catch (error) {
        dispatch(fetchingFailure());
        console.log(error);
    }
}


export const getUsersData = (userData) => async (dispatch, setUsers)=>{
    dispatch(startFetching());
    try {
        const { data } = await api.getUsersData(userData);
        setUsers(data);
        dispatch(usersDetailsfetchingSuccess(data));
    } catch (error) {
        dispatch(fetchingFailure());
        console.log(error);
    }
}


export const getOrdersData = (userData, setOrders) => async (dispatch)=>{
    dispatch(startFetching());
    try {
        console.log(userData);
        const { data } = await api.getOrdersData(userData);
        setOrders(data);
        dispatch(ordersDetailsfetchingSuccess(data));
    } catch (error) {
        dispatch(fetchingFailure());
        console.log(error);
    }
}


export const adminSignout = (navigate, setUser) => async (dispatch) =>{
    try {
        dispatch(logout());
        setUser(null);
        navigate('/');
    } catch (error) {
        console.log(error)
    }
}


export const addProductFromSupp = (formData, userData) => async(dispatch)=>{
    dispatch(startFetching());
    try {
        const resData = await api.addProductFromSupp(formData);
        // console.log(resData);
        const { data } = await api.getUsersData(userData);
        dispatch(productDetailsfetchingSuccess(data));
    } catch (error) {
        dispatch(fetchingFailure());
        console.log(error);
    }
}
export const deleteProductById = (formData, userData, setData) => async(dispatch)=>{
    dispatch(startFetching());
    try {
        const resData = await api.deleteProductById(formData);
        // console.log(resData.data);
        const { data } = await api.getUsersData(userData);
        setData(data);
        dispatch(productDetailsfetchingSuccess(data));
    } catch (error) {
        dispatch(fetchingFailure());
        console.log(error);
    }
}