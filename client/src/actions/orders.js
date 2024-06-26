import * as api from '../api/index';


const user = JSON.parse(localStorage.getItem("persist:root"))?.user;
const currentUser = user && JSON.parse(user).currentUser;
const TOKEN = currentUser?.token;


export const createOrder = (currentUser, cart, addressData, transactionId) => async (dispatch) => {
  const userId = currentUser._id;  
  try {
        const res = await api.makeOrder({
          token : TOKEN,
            userId: userId,
            products: cart.products.map((item) => ({
              productId: item._id,
              quantity: item.quantity,
              productIdStr: item._id,
            })),
            amount: cart.total,
            address: `${addressData.address1}, ${addressData.city}` ,
            transactionId : transactionId
          });
    } catch (error) {
        console.log(error);
    }
  };

  
export const getOrdersByUserId = (currentUser) => async (dispatch) => {
  const userId = currentUser._id;  
  try {
        const res = await api.getOrdersDetailsByUserId(userId);
    } catch (error) {
        console.log(error);
    }
  };

  