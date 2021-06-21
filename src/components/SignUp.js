import React, { useState } from 'react';
import { FormControl, FormHelperText, Button, TextField } from '@material-ui/core';

const initialFormValues = {
    email:"",
    password:""
}

const SignUp = () => {
    const [formValues, setFormValues] = useState(initialFormValues);

    const onChange = (e) => {
        e.preventDefault();
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value
        })
        console.log(formValues);
    }

    return(
        <div>
            <div className="formContainer">
                <h2>Sign Up</h2>
                <form className="form">
                    <FormControl className="formInputs">
                        {/* <InputLabel htmlFor="my-input"></InputLabel> */}
                        <TextField 
                            id="filled-basic"
                            label="Email Address" 
                            aria-describedby="email address input field"
                            defaultValue="Email address"

                            type="email"
                            name="email"
                            value={formValues.email}
                            onChange={onChange} />
                        <FormHelperText id="my-helper-text">We'll never share your email</FormHelperText>
                    </FormControl>

                    <FormControl>
                    <TextField 
                            id="filled-basic"
                            label="Create password" 
                            aria-describedby="create password input field"
                            defaultValue="Create password"
                            type="password"
                            name="password"
                            value={formValues.password}
                            onChange={onChange} />
                        <FormHelperText id="my-helper-text">Must be at least 8 characters</FormHelperText>
                    </FormControl>
                    <Button variant="contained" color="primary">Sign Up</Button>
                </form>
            </div>
        </div>
    )
}

export default SignUp;