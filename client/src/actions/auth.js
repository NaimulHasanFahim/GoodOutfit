import * as api from '../api/index';
import { logout, signinFailure, signinStart, signinSuccess, signupFailure, signupStart, signupSuccess } from '../redux/userRedux';
// SIGN UP ACTION
export const signin = (formData, navigate, setUser) => async (dispatch) => {
    dispatch(signinStart());

    try {
        const { data } = await api.signIn(formData);
        console.log(data);
        navigate('/');
        dispatch(signinSuccess(data));
        window.location.reload();
        // setUser( useSelector(state=> state.user.currentuser));
        
    } catch (error) {
        console.log(error)
        dispatch(signinFailure());
    }
}

export const signup = (formData, navigate) => async (dispatch) => {
    dispatch(signupStart());

    try {
        const { data } = await api.signUp(formData);
        // console.log(data);
        dispatch(signupSuccess(data));
        
    } catch (error) {
        console.log(error)
        dispatch(signupFailure());
    }
}

export const signout = (navigate, setUser) => async (dispatch) =>{
    try {
        dispatch(logout());
        setUser(null);
        navigate('/');
    } catch (error) {
        console.log(error)
    }
}


// //SIGN IN ACTION
// export const signin = (formData) => async (dispatch) => {
//     try {
//         const { data } = await api.signIn(formData);
//         console.log(data)
//         dispatch({ type: AUTH, data })
//         setUserId("SignIn")
//         navigate('/');
//     } catch (error) {
//         console.log(error)
//     }
// }
