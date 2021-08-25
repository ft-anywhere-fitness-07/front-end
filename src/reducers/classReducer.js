import { CREATE_CLASS_START, CREATE_CLASS_SUCCESS, CREATE_CLASS_FAIL, FETCH_CLASSES_START, FETCH_CLASSES_SUCCESS, FETCH_CLASSES_FAIL, EDIT_CLASS_START, EDIT_CLASS_SUCCESS, EDIT_CLASS_FAIL, DELETE_CLASS_START, DELETE_CLASS_SUCCESS, DELETE_CLASS_FAIL, SEARCH } from './../actions/classActions';

export const initialState = {
    isLoading: false,
    error: "",
    classList: []
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case(CREATE_CLASS_START):
            return({
                ...state,
                error: "",
                isLoading: true
            })
        case(CREATE_CLASS_SUCCESS):
            return({
                ...state,
                isLoading: false,
                classList: [...state.classList, action.payload]
            })
        case(CREATE_CLASS_FAIL):
            return({
                ...state,
                isLoading: false,
                error: action.payload
            })
        case(FETCH_CLASSES_START):
            return({
                ...state,
                error: "",
                isLoading: true
            })
        case(FETCH_CLASSES_SUCCESS):
            return({
                ...state,
                isLoading: false,
                classList: action.payload
            })
        case(FETCH_CLASSES_FAIL):
            return({
                ...state,
                isLoading: false,
                error: action.payload
            })
        case(EDIT_CLASS_START):
            return({
                ...state,
                error: "",
                isLoading: true
            })
        case(EDIT_CLASS_SUCCESS):
            const index = state.classList.findIndex(item => item.classId === action.payload.classId)
            const newArray = [...state.classList]
            newArray[index] = action.payload
            return({
                ...state,
                isLoading: false,
                classList: newArray
            })
        case(EDIT_CLASS_FAIL):
            return({
                ...state,
                isLoading: false,
                error: action.payload
            })
        case(DELETE_CLASS_START):
            return({
                ...state,
                error: "",
                isLoading: true
            })
        case(DELETE_CLASS_SUCCESS):
            return({
                ...state,
                isLoading: false,
                classList: [...state.classList.filter(item => item.classId !== action.payload.classId)]
            })
        case(DELETE_CLASS_FAIL):
            return({
                ...state,
                isLoading: false,
                error: action.payload
            })
        case(SEARCH):
            return({
                ...state,
                classList: action.payload
            })

        default: return state;
    }
}

export default reducer;