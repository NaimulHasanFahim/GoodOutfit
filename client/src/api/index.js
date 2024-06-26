import axios from 'axios';

const { REACT_APP_API_ENDPOINT } = process.env;
const API = axios.create({ baseURL: REACT_APP_API_ENDPOINT });


const user = JSON.parse(localStorage.getItem("persist:root"))?.user;
const currentUser = user && JSON.parse(user).currentUser;
const TOKEN = currentUser?.token;


const userRequest = axios.create({
    baseURL: REACT_APP_API_ENDPOINT,
    header: { token: `Bearer ${TOKEN}` },
  });


export const fetchProductById = (id) => API.get(`/posts/${id}`);
export const fetchAllProducts = ( ) => API.get(`/posts`);
export const signIn = (formData) => API.post('/auth/signin', formData);
export const signUp = (formData) => API.post('/auth/signup', formData);
export const makeOrder = (formData) => userRequest.post('/orders/', formData);
export const getOrdersDetailsByUserId = (userId) => userRequest.get(`/orders/find/${userId}`);
export const updateBankData = (formData, id) => API.post(`/users/${id}`, formData);

//ADMIN API CALL
export const getWidgetData = (userData)=> API.post('/admin/widget', userData);
export const getProductsData = (userData)=> API.get('/products');
export const getUsersData = (userData) => API.post('/users', userData);
export const getOrdersData = (userData) => API.get('/orders/allorders', userData);
export const addProductFromSupp=(formData) => API.post('/products/add', formData);
export const deleteProductById = (formData) => API.post('/products/delete', formData);



// TEMPLATE API CALL 
// export const getUsersById = (id) => API.get(`/profile/${id}`);
// export const fetchSingleUserPosts = (id) => API.get(`/posts/single/${id}`);
// export const updateUserProfile = (id, userData) => API.patch(`/user/update/${id}`, userData);

// export const fetchContributionByPostId = (id) => API.get(`/posts/contributedpost/${id}`);
// export const fetchAllpdfs = () => API.get(`/posts/pdfs`);
// export const addnewReasources = (newPost) => API.post('/posts/addpdf', newPost);
// export const deletePdf = (id) => API.delete(`/posts/pdfs/delete/${id}`);
// export const getIndividulaContributionById = (id)=>API.get(`/posts/getbyId/${id}`)

// export const fetchPostsBySearch = (searchQuery) => API.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`);
// export const createPost = (newPost) => API.post('/posts', newPost);
// export const likePost = (id) => API.patch(`/posts/${id}/likePost`);
// export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);

// export const updateContribute = (id, updatedPost) => API.patch(`/posts/contribute/${id}`, updatedPost);
// export const deletePost = (id) => API.delete(`/posts/${id}`);
// export const comment = (value, id) => API.post(`/posts/${id}/commentPost`, { value });

