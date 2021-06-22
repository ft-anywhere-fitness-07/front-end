import React, { useState } from 'react';
import { FormControl, FormHelperText, Button, TextField, RadioGroup, FormControlLabel, Radio } from '@material-ui/core';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const initialFormValues = {
    username:"",
    email:"",
    password:"",
    role:""
}

const SignUp = () => {
    const [formValues, setFormValues] = useState(initialFormValues);
    const { push } = useHistory();

    const handleChange = (e) => {
        e.preventDefault();
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value
        })
        console.log(formValues)
    }

    const onSubmit = (e) => {
        e.preventDefault();
        axios.post("https://anywhere-fitness-back-end.herokuapp.com/api/auth/register", formValues)
        .then(res=> {
            console.log(res)
            // localStorage.setItem("token", res.data.token)
            push("/classes")
        })
        .catch(err => {
            console.log(err)
        })
    }

    return(
        <div>
            <div className="formContainer">
                <h2>Sign Up</h2>
                <form className="form">
                <FormControl>
                    <TextField 
                            id="filled-basic"
                            label="Create username" 
                            aria-describedby="create username input field"
                            defaultValue="Create username"
                            type="text"
                            name="username"
                            value={formValues.username}
                            onChange={handleChange} />
                        <FormHelperText id="my-helper-text">Must be at least 8 characters</FormHelperText>
                    </FormControl>

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
                            onChange={handleChange} />
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
                            onChange={handleChange} />
                        <FormHelperText id="my-helper-text">Must be at least 8 characters</FormHelperText>
                    </FormControl>

                    <RadioGroup aria-label="role" value={formValues.role} name="role" onChange={handleChange}>
                        <FormControlLabel value="client" control={<Radio />} label="Client" />
                        <FormControlLabel value="instructor" control={<Radio />} label="Instructor" />
                    </RadioGroup>
                    <Button variant="contained" color="primary" onClick={onSubmit}>Sign Up</Button>
                </form>
            </div>
        </div>
    )
}

export default SignUp;