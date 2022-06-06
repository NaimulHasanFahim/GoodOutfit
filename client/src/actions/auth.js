import * as api from '../api/index';
import { signinFailure, signinStart, signinSuccess, signupFailure, signupStart, signupSuccess } from '../redux/userRedux';
// SIGN UP ACTION
export const signin = (formData) => async (dispatch) => {
    dispatch(signinStart());

    try {
        const { data } = await api.signIn(formData);
        console.log(data);
        dispatch(signinSuccess(data));
    } catch (error) {
        console.log(error)
        dispatch(signinFailure());
    }
}

export const signup = (formData) => async (dispatch) => {
    dispatch(signupStart());

    try {
        const { data } = await api.signUp(formData);
        console.log(data);
        dispatch(signupSuccess(data));
    } catch (error) {
        console.log(error)
        dispatch(signupFailure());
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
