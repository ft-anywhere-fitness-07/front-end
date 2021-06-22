import React, { useState, useEffect } from 'react';
import { FormControl, FormHelperText, Button, TextField, RadioGroup, FormLabel, FormControlLabel, Radio } from '@material-ui/core';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import schema from '../validation/signUpFormSchema';
import * as yup from 'yup';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { blue } from '@material-ui/core/colors';

const useStyles = makeStyles({
    errorText: {
        color:"red"
    }
});

const BlueRadio = withStyles({
    root: {
        color: blue[400],
        '&checked': {
            color: blue[600],
        },
    },
    checked :{},
})((props) => <Radio color="default" {...props} />);

const initialFormValues = {
    username:"",
    email:"",
    password:"",
    role:"client"
}

const initialErrorValues = {
    username:"",
    email:"",
    password:"",
    role:""
}

const SignUp = () => {
    const [formValues, setFormValues] = useState(initialFormValues);
    const [formErrors, setFormErrors] = useState(initialErrorValues);
    const [disabled, setDisabled] = useState(true);
    const { push } = useHistory();

    const classes = useStyles();

    const handleChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        validate(name,value);
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = (e) => {
        e.preventDefault();
        axios.post("https://anywhere-fitness-back-end.herokuapp.com/api/auth/register", formValues)
        .then(res=> {
            localStorage.setItem("token", res.data.token)
            push("/classes")
        })
        .catch(err => {
            console.log(err)
        })
    }

    const validate = (name, value) => {
        yup.reach(schema, name)
            .validate(value)
            .then(() => setFormErrors({...formErrors, [name]:""}))
            .catch(err => setFormErrors({...formErrors, [name]:err.errors[0]}))
    }

    useEffect(() => {
        schema.isValid(formValues).then(valid => setDisabled(!valid))
    }, [formValues])

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
                            onChange={handleChange}
                            error={formErrors.username ? true : false}
                            />
                        <FormHelperText id="my-helper-text">{formErrors.username ? <p className={classes.errorText}>{formErrors.username}</p> : "Must be at least 8 characters"}</FormHelperText>
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
                            onChange={handleChange}
                            error={formErrors.email ? true : false} />
                        <FormHelperText id="my-helper-text">{formErrors.email ? <p className={classes.errorText}>{formErrors.email}</p> : "We'll never share your email"}</FormHelperText>
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
                            onChange={handleChange}
                            error={formErrors.password ? true : false} />
                        <FormHelperText id="my-helper-text">{formErrors.password ? <p className={classes.errorText}>{formErrors.password}</p> : "Must be at least 8 characters"}</FormHelperText>
                    </FormControl>

                    <FormControl component="fieldset">
                    <FormLabel component="legend">Role</FormLabel>
                        <RadioGroup aria-label="role" value={formValues.role} name="role" onChange={handleChange}>
                            <FormControlLabel 
                                name="role" 
                                value="client" 
                                checked={formValues.role === "client"} 
                                control={<BlueRadio />} label="Client"
                                inputProps={{ 'aria-label': 'client'}} />
                            <FormControlLabel 
                                name="role" 
                                value="instructor" 
                                checked={formValues.role === "instructor"} 
                                control={<BlueRadio />} label="Instructor"
                                inputProps={{ 'aria-label': 'instructor'}} />
                        </RadioGroup>
                    </FormControl>

                    <Button variant="contained" color="primary" disabled={disabled} onClick={onSubmit}>Sign Up</Button>
                </form>
            </div>
        </div>
    )
}

export default SignUp;