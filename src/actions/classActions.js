import axiosWithAuth from './../utils/axiosWithAuth';

export const FETCH_CLASSES_START = "FETCH_CLASSES_START";
export const FETCH_CLASSES_SUCCESS = "FETCH_CLASSES_SUCCESS";
export const FETCH_CLASSES_FAIL = "FETCH_CLASSES_FAIL";

export const CREATE_CLASS_START = "CREATE_CLASS_START";
export const CREATE_CLASS_SUCCESS = "CREATE_CLASS_SUCCESS";
export const CREATE_CLASS_FAIL = "CREATE_CLASS_FAIL";

export const EDIT_CLASS_START = "EDIT_CLASS_START";
export const EDIT_CLASS_SUCCESS = "EDIT_CLASS_SUCCESS";
export const EDIT_CLASS_FAIL = "EDIT_CLASS_FAIL";

export const DELETE_CLASS_START = "DELETE_CLASS_START";
export const DELETE_CLASS_SUCCESS = "DELETE_CLASS_SUCCESS";
export const DELETE_CLASS_FAIL = "DELETE_CLASS_FAIL";

export const SEARCH = "SEARCH";

// FETCH
export const fetchClasses = () => {
    return(dispatch) => {
        dispatch(fetchClassesStart())

        axiosWithAuth()
        .get('/api/classes')
        .then(res => {
            dispatch(fetchClassesSuccess(res.data))
        })
        .catch(err => {
            dispatch(fetchClassesFail(err))
        })
    }
}

export const fetchClassesStart = () => {
    return({type:FETCH_CLASSES_START})
}
export const fetchClassesSuccess = (classes) => {
    return({type:FETCH_CLASSES_SUCCESS, payload:classes})
}
export const fetchClassesFail = (error) => {
    return({type:FETCH_CLASSES_FAIL, payload:error})
}


// CREATE
export const createClass = (newClass) => {
    return (dispatch) => {
        dispatch(createClassStart());

        axiosWithAuth()
        .post("/api/classes", newClass)
        .then(res=> {
            dispatch(createClassSuccess(res.data))
        })
        .catch(err => {
            dispatch(createClassFail(err))
        })
    }
}

export const createClassStart = () => {
    return({type:CREATE_CLASS_START});
}
export const createClassSuccess = (createdClass) => {
    return({type:CREATE_CLASS_SUCCESS, payload:createdClass})
}
export const createClassFail = (error) => {
    return({type:CREATE_CLASS_FAIL, payload:error})
}



// EDIT
export const editClass = (classEdits, id) => {
    return(dispatch) => {
        dispatch(editClassStart())

        axiosWithAuth()
        .put(`/api/classes/${id}`, classEdits)
        .then(res => {
            dispatch(editClassSuccess(res.data))
        })
        .catch(err => {
            dispatch(editClassFail(err))
        })
    }
}

export const editClassStart = () => {
    return({type:EDIT_CLASS_START})
}
export const editClassSuccess = (classes) => {
    return({type:EDIT_CLASS_SUCCESS, payload:classes})
}
export const editClassFail = (error) => {
    return({type:EDIT_CLASS_FAIL, payload:error})
}


// DELETE
export const deleteClass = (id) => {
    return(dispatch) => {
        dispatch(deleteClassStart())

        axiosWithAuth()
        .delete(`/api/classes/${id}`)
        .then(res => {
            dispatch(deleteClassSuccess(res.data.removed))
        })
        .catch(err => {
            dispatch(deleteClassFail(err))
        })
    }
}

export const deleteClassStart = () => {
    return({type:DELETE_CLASS_START})
}
export const deleteClassSuccess = (deletedClass) => {
    return({type:DELETE_CLASS_SUCCESS, payload:deletedClass})
}
export const deleteClassFail = (error) => {
    return({type:DELETE_CLASS_FAIL, payload:error})
}


// SEARCH
export const search = (filteredClasses) => {
    return({type:SEARCH, payload:filteredClasses})
}