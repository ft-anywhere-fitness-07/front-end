import React, { useState } from 'react';
import { FormControl, FormHelperText, Button, TextField } from '@material-ui/core';
import axiosWithAuth from '../utils/axiosWithAuth';
import { useHistory } from 'react-router-dom'
;
const initialFormValues = {
    username:"",
    password:""
}

const SignIn = () => {
    const [formValues, setFormValues] = useState(initialFormValues);
    const { push } = useHistory();

    const onChange = (e) => {
        e.preventDefault();
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = (e) => {
        e.preventDefault();
        console.log("submit")
        axiosWithAuth()
        .post("/api/auth/login", formValues)
        .then(res => {
            console.log(res)
            push("/classes")
        })
        .catch(err => {
            console.log(err)
        })
    }
 
    return(
        <div>
            <div className="formContainer">
                <h2>Sign In</h2>
                <form className="form">
                    <FormControl className="formInputs">
                        {/* <InputLabel htmlFor="my-input"></InputLabel> */}
                        <TextField 
                            id="filled-basic"
                            label="Username" 
                            aria-describedby="username input field"
                            defaultValue="Username"

                            type="text"
                            name="username"
                            value={formValues.username}
                            onChange={onChange} />
                        {/* <FormHelperText id="my-helper-text">We'll never share your email</FormHelperText> */}
                    </FormControl>

                    <FormControl>
                    <TextField 
                            id="filled-basic"
                            label="Password" 
                            aria-describedby="Password input field"
                            defaultValue="Password"
                            type="password"
                            name="password"
                            value={formValues.password}
                            onChange={onChange} />
                        {/* <FormHelperText id="my-helper-text">Must be at least 8 characters</FormHelperText> */}
                    </FormControl>
                    <Button variant="contained" color="primary" onClick={onSubmit}>Sign In</Button>
                </form>
            </div>
        </div>
    )
}

export default SignIn;