import { LOGIN_START, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT } from './../actions/loginActions';
import { SIGNUP_START, SIGNUP_SUCCESS, SIGNUP_FAIL } from './../actions/signUpActions';

export const initialState = {
    isLoading: false,
    error: "",
    isAuth: false,
    isInstructor: false
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case(LOGIN_START):
            return({
                ...state,
                isLoading: true,
                error: ""
            })
        case(LOGIN_SUCCESS):
            return({
                ...state,
                isLoading: false,
                isAuth: true,
                isInstructor: action.role === "instructor" ? true : false
            })
        case(LOGIN_FAIL):
            return({
                ...state,
                isLoading: false,
                error: action.payload
            })
        case(LOGOUT):
            return({
                ...state,
                isAuth: false,
                isInstructor: false
            })
        case(SIGNUP_START):
            return({
                ...state,
                error: "",
                isLoading: true
            })
        case(SIGNUP_SUCCESS):
            return({
                ...state,
                isLoading: false,
                isAuth: true,
                isInstructor: action.role === "instructor" ? true : false
            })
        case(SIGNUP_FAIL):
            return({
                ...state,
                error: action.payload
            })
        default: return state
    }
}

export default reducer;