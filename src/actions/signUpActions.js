import axios from 'axios';

export const SIGNUP_START = "SIGNUP_START";
export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
export const SIGNUP_FAIL = "SIGNUP_FAIL";


export const signUp = (credentials) => {
    return (dispatch) => {
        dispatch(signUpStart(credentials));
        
        axios
        .post("https://anywhere-fitness-back-end.herokuapp.com/api/auth/register", credentials)
        .then(res=> {
            localStorage.setItem("token", res.data.token)
            localStorage.setItem("role", res.data.user.role)
            dispatch(signUpSuccess(res.data.token, res.data.user.role))
        })
        .catch(err => {
            dispatch(signUpFail(err))
        })
    }
}

export const signUpStart = (credentials) => {
    return({type:SIGNUP_START, payload:credentials});
}

export const signUpSuccess = (token, role) => {
    return({type:SIGNUP_SUCCESS, token, role})
}

export const signUpFail = (error) => {
    return({type:SIGNUP_FAIL, payload:error})
}